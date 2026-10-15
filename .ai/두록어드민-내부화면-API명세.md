# 두록 어드민 내부 관리 화면 — API 명세

두록 어드민(DOLOG_ADMIN)만 쓰는 내부 운영 화면용 정리입니다. 프론트는 React로 만들고, 메인 서비스와 별도로 내부 전용 라우트로 둘 예정입니다(일반 사용자 화면과 섞이지 않게).

모든 응답은 아래 포맷으로 감싸져 있습니다.

```json
{
  "isSuccess": true,
  "code": "SUCCESS_200",
  "httpStatus": 200,
  "message": "...",
  "data": { },
  "timeStamp": "2026-10-08 12:00:00"
}
```

모든 요청에 `Authorization: Bearer {accessToken}` 헤더가 필요합니다(로그인 제외). Swagger 문서: `/swagger-ui/index.html` (인증 없이 접근 가능, 직접 호출해보며 확인 가능).

---

## 0. 로그인

일반 작가(소셜 로그인)·전시 어드민(코드 로그인)과 다르게, 두록 어드민은 **이메일/비밀번호**로 로그인합니다.

### 로그인
- `POST /auth/login`

**Request Body**
| key | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| email | String | O | |
| password | String | O | |

**Response (data)**
| key | 타입 | 설명 |
| --- | --- | --- |
| accessToken | String | |
| refreshToken | String | |

응답에 role이 없습니다. 로그인 후 `GET /accounts/me`를 호출해서 `role`이 `DOLOG_ADMIN`인지 확인하고 라우팅을 가르면 됩니다.

### 토큰 재발급
- `POST /auth/refresh`

**Request Body**: `{ "refreshToken": "..." }`
**Response (data)**: 로그인과 동일 (`accessToken`, `refreshToken`)

### 로그아웃
- `POST /auth/logout` — body 없음 (Authorization 헤더만)

### 내 계정 정보 조회
- `GET /accounts/me`

**Response (data)**
| key | 타입 | 설명 |
| --- | --- | --- |
| accountId | UUID | |
| email | String | |
| role | String (enum) | `DOLOG_ADMIN` / `EXHIBITION_ADMIN` / `ARTIST_ADMIN` |
| accountStatus | String (enum) | `ACTIVE` 등 |
| exhibitionId | UUID \| null | 전시 어드민일 때만 |
| artistId | UUID \| null | 작가일 때만 |

---

## 1. 전시 관리

### 전시 목록 조회 (공개 API, 인증 불필요)
- `GET /exhibitions`

**Query Parameter** (전부 선택)
| key | 타입 | 설명 |
| --- | --- | --- |
| is_public | Boolean | 생략하면 공개/비공개 전부 |
| univ_name | String | |
| exhibition_type | String (enum) | `ExhibitionType` |
| search | String | |

**Response (data)**: `ExhibitionListItemResponse[]`
| key | 타입 |
| --- | --- |
| id | String(UUID) |
| slug | String |
| title | String |
| univName | String |
| deptName | String |
| exhibitionType | String(enum) |
| imageUrl | String \| null |
| startDate | String(yyyy-MM-dd) \| null |
| endDate | String(yyyy-MM-dd) \| null |
| address | String \| null |
| dDay | Long \| null |
| logoImg | String \| null |

### 전시 기본정보 등록 (전시회 첫 개설)
- `POST /exhibitions`

**Request Body**
| key | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| univName | String | O | |
| collegeName | String | X | |
| deptName | String | O | |
| exhibitionType | String(enum) | O | `ExhibitionType` |
| slug | String | O | URL 슬러그 |
| isPublic | Boolean | X | 기본값 true |

**Response (data)**
| key | 타입 | 설명 |
| --- | --- | --- |
| id | String(UUID) | |
| slug | String | |
| message | String | |
| entryCode | String | 전시 어드민 로그인 코드 (생성 시 자동 발급) |
| artistJoinCode | String | 작가 참여 코드 (생성 시 자동 발급) |

### 전시 기본정보 수정
- `PATCH /exhibitions/{exhibitionId}`

**Request Body** (전부 선택, null이면 기존 값 유지로 보임 — 실제 동작은 서비스 코드 확인 필요)
| key | 타입 |
| --- | --- |
| univName | String |
| collegeName | String |
| deptName | String |
| exhibitionType | String(enum) |
| slug | String |
| isPublic | Boolean |

### 전시 삭제
- `DELETE /exhibitions/{exhibitionId}` — body 없음

### 전시 상세정보 등록/수정 (제목, 이미지, 기간 등)
- `PUT /exhibitions/{exhibitionId}/details` — `multipart/form-data`

**Request (form-data)**
| key | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| title | String | X | |
| exhibitionImg | File | X | |
| description | String | X | |
| startDate | Date(yyyy-MM-dd) | X | |
| endDate | Date(yyyy-MM-dd) | X | |
| dateInfo | String | X | |
| email | String | X | 주최 측 연락 이메일 |
| logoImg | File | X | |
| copyright | String | X | |
| ogImage | File | X | |
| faviconImg | File | X | |
| openTime | Time(HH:mm) | X | |
| closeTime | Time(HH:mm) | X | |
| operationNotice | String | X | 최대 255자 |

**Response (data)**: `{ exhibitionId, message }`

### 전시 로그인 코드(entry-code) 발급/재발급
- `POST /exhibitions/{exhibitionId}/entry-code`

**Request Body**: `{ "expiresAt": "yyyy-MM-dd HH:mm:ss" | null }` (미래 시각만, 생략 가능)
**Response (data)**: `{ "entryCode": "...", "entryCodeExpiresAt": "..." }`

### 작가 참여 코드 발급/재발급
- `POST /exhibitions/{exhibitionId}/artist-join-code`

**Request Body**: `{ "expiresAt": "yyyy-MM-dd HH:mm:ss" | null }`
**Response (data)**: `{ "artistJoinCode": "...", "artistJoinCodeExpiresAt": "..." }`

### 게시 기간 연장
- `PATCH /exhibitions/{exhibitionId}/expires-at`

**Request Body**: `{ "expiresAt": "yyyy-MM-dd HH:mm:ss" }` (미래 시각 필수)
**Response (data)**: `{ "publishedAt": "...", "expiresAt": "..." }`

---

## 2. 전시 참여 작가 관리

### 전시별 참여 작가 목록 (관리용)
- `GET /exhibitions/{exhibitionId}/artists/manage`

**Query Parameter**
| key | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| status | String(enum) | O | `PENDING` 또는 `JOINED`만 가능 |
| search | String | X | 이름/이메일 검색 |
| page | Integer | X | 기본값 0 |
| size | Integer | X | 기본값 10, 최대 100 |

**Response (data)**
| key | 타입 | 설명 |
| --- | --- | --- |
| artists[].artistId | UUID | |
| artists[].nameKo | String | |
| artists[].email | String \| null | |
| artists[].greeting | String | 참여 신청 인사말 |
| artists[].artworkCount | Integer \| null | status=JOINED일 때만 값 있음 |
| totalCount | Integer | |
| totalPages | Integer | |

⚠️ 이 API는 **전시 하나씩**만 조회됩니다. 전체 전시를 가로지르는 "신청 전체 현황" 화면을 만들려면 백엔드에 새 API가 필요합니다(현재 없음).

### 참여 작가 상태 일괄 변경 (승인/거절/제외)
- `PATCH /exhibitions/{exhibitionId}/artists/status`

**Request Body**
| key | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| artistIds | UUID[] | O | 1~100명 |
| status | String(enum) | O | `JOINED`(승인) / `DENIED`(거절) / `REMOVED`(제외)만 가능 |

**Response (data)**: `{ "updatedCount": number }`

### 전시 작가 추가 / 제외 (단건)
- `POST /exhibitions/{exhibitionId}/artists` — `{ "artistId": "UUID" }` → 응답 `{ mapId, status }` 정도 (`ExhibitionArtistAddResponse`)
- `DELETE /exhibitions/{exhibitionId}/artists/{artistId}` — body 없음

---

## 3. 요금제(Plan) 관리

### 요금제 목록 조회 (공개 API, 인증 불필요)
- `GET /plans` — 활성 요금제만 반환. 필드는 요금제 등록과 동일 + `discountedPrice`, `monthlyPrice` 자동계산값 포함.

### 요금제 등록
- `POST /plans`

**Request Body**
| key | 타입 | 필수 |
| --- | --- | --- |
| name | String | O |
| description | String | X |
| maxArtworkCount | Integer | X |
| minCommitmentMonths | Integer | X |
| isPopular | Boolean | X (미입력 시 false) |
| displayOrder | Integer | X |
| targetSizes | String(enum)[] | O (`SMALL`/`MEDIUM`/`LARGE`) |
| prices | Array | O, 1개 이상 |
| prices[].billingCycle | String(enum) | O (`MONTHLY`/`SEMIANNUAL`/`ANNUAL`) |
| prices[].price | BigDecimal | O, 정가 총액, 0보다 커야 함 |
| prices[].discountRate | BigDecimal | X, 0~100 |
| prices[].months | Integer | O, 0보다 커야 함 |

**Response (data)**: `{ planId, name, isActive, createdAt }`

### 요금제 수정
- `PATCH /plans/{planId}`

**Request Body** (등록과 거의 동일, 전부 선택 — null/미입력은 기존 값 유지로 추정, 서비스 코드 확인 권장)
| key | 타입 |
| --- | --- |
| name | String |
| description | String |
| maxArtworkCount | Integer |
| minCommitmentMonths | Integer |
| isPopular | Boolean |
| displayOrder | Integer |
| targetSizes | String(enum)[] |
| prices | `PlanPriceCreateRequest[]` (등록과 동일 구조) |

**Response (data)**: `{ planId, name, maxArtworkCount, targetSizes, updatedAt }`

### 요금제 활성 상태 변경
- `PATCH /plans/{planId}/active-status`

**Request Body**: `{ "isActive": true | false }`
**Response (data)**: `{ planId, isActive, updatedAt }`

---

## 4. 구독(Subscription) 관리

### 전체 구독 현황 조회 — "플랜 누가 신청했는지"
- `GET /subscriptions`

**Query Parameter**
| key | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| status | String(enum) | X | `PENDING_PAYMENT`/`ACTIVE`/`CANCELED`/`EXPIRED`. 생략하면 전체 |

**Response (data)**: `SubscriptionMyResponse[]`
| key | 타입 |
| --- | --- |
| subscriptionId | UUID |
| exhibitionId | UUID |
| exhibitionName | String |
| planId | UUID |
| planName | String |
| billingCycle | String(enum) |
| status | String(enum) |
| startedAt | String(DateTime) \| null |
| endedAt | String(DateTime) \| null |

> 참고: 이 응답엔 결제 금액(`paidAmount`)이 없습니다. 금액까지 보려면 백엔드에 필드 추가가 필요할 수 있어요.

### 구독 상태 강제 변경 (승인/취소/만료 처리)
- `PATCH /subscriptions/{subscriptionId}/status`

허용되는 전이만 가능합니다: `PENDING_PAYMENT→ACTIVE`, `PENDING_PAYMENT→CANCELED`, `ACTIVE→CANCELED`, `ACTIVE→EXPIRED`. 그 외는 409.

**Request Body**: `{ "status": "ACTIVE" | "CANCELED" | "EXPIRED" }`
**Response (data)**: `{ subscriptionId, exhibitionId, status, startedAt, endedAt }`

### 해지 유예기간 정책
- `GET /subscriptions/policy` → `{ "cancelGraceDays": number }`
- `PATCH /subscriptions/policy` — Request: `{ "cancelGraceDays": 0 }` (0 이상) → 같은 응답

### 환불 목록 / 완료 처리
- `GET /subscriptions/refunds?status=PENDING|COMPLETED` (status 선택)

**Response (data)**: `SubscriptionRefundResponse[]`
| key | 타입 |
| --- | --- |
| refundId | UUID |
| subscriptionId | UUID |
| exhibitionId | UUID |
| paidAmount | BigDecimal |
| totalDays | Integer |
| usedDays | Integer |
| refundAmount | BigDecimal |
| status | String(enum) `PENDING`/`COMPLETED` |
| requestedAt | String(DateTime) |
| completedAt | String(DateTime) \| null |

- `PATCH /subscriptions/refunds/{refundId}/complete` — body 없음. 실제 송금은 수동으로 하고 이 API로 완료 표시만 함.

---

## 5. 작가 / 계정 관리

### 작가 목록 조회
- `GET /artists`

**Query Parameter**: `search`(선택), `page`(기본 0), `size`(기본 10)

**Response (data)**
| key | 타입 |
| --- | --- |
| artists[].artistId | UUID |
| artists[].nameKo | String |
| artists[].nameEn | String \| null |
| artists[].phone | String \| null |
| artists[].accountEmail | String \| null |
| artists[].createdAt | String(DateTime) |
| totalElements | Long |
| totalPages | Integer |

### 계정 목록 조회
- `GET /accounts?role=DOLOG_ADMIN|EXHIBITION_ADMIN|ARTIST_ADMIN` (role 생략 가능)

**Response (data)**: `AccountResponse[]` — `{ id, email, role, accountStatus }`

### 두록 관리자 계정 생성
- `POST /accounts/admin` — `{ "email": "...", "password": "..." }` → `{ id, email, role, accountStatus }`

---

## 6. 작품(Artwork) 관리

### ⚠️ 전체 작품 목록 조회 — 아직 없음
지금 `GET /artworks`는 **공개(PUBLISHED)된 것만** 보여줘요. 숨김·비공개·플랜 한도 초과 미노출까지 다 보는 관리자용 전체 조회는 없습니다. 필요하면 백엔드에 먼저 요청해 주세요.

### 작품 통합 수정 (그룹 변경, 숨김, 공개상태 등)
- `PUT /exhibitions/{exhibitionId}/artworks/{artworkId}` — `multipart/form-data`. path의 전시에 출품된 작품만 가능(아니면 404).

**Request (form-data, 주요 필드만 — 전체 필드는 많아서 핵심만 적음)**
| key | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| title | String | O | |
| description | String | O | |
| category | String | O | |
| materials | String[] | X | |
| width / height / depth | BigDecimal | X | |
| shortIntro | String | X | |
| productionStartYear/Month/Day, productionEndYear/Month/Day | Integer | X | |
| purchaseUrl / purchaseChatUrl | String | X | |
| showPurchaseButton | Boolean | X | |
| youtubeUrl | String | X | |
| zoneId | UUID | O | 이 전시의 구역만 가능 |
| prevOrder / nextOrder | Integer | X | 둘 다 주거나 둘 다 생략 |
| artistProfileIds | UUID[] | O | 공동 작가 (전시별 프로필 ID 기준) |
| artistRoles | Map\<UUID,String\> | X | 프로필ID → 역할, 생략 시 기존 유지 |
| images | JSON 배열 | X | 안 보내면 기존 이미지 유지 |
| status | String(enum) | X | `DRAFT`/`PUBLISHED` |
| hidden | Boolean | X | 전시 노출 숨김/재공개 |

**Response (data)**
| key | 타입 |
| --- | --- |
| artworkId | UUID |
| title | String |
| updatedArtistIds | UUID[] (프로필 ID) |
| updatedImageIds | UUID[] |
| status | String(enum) |
| hidden | Boolean |

---

## 7. 알림

### 알림 목록 조회 (두록 어드민도 조회 가능, 읽음 처리는 불가)
- `GET /notifications?size=20` (기본 20, 최대 100)

자세한 알림 타입/payload는 별도 명세(`알림 목록 조회` 명세) 참고.

---

## 8. 이번 정리에서 빠진 것 (필요하면 요청)

아래도 다 DOLOG_ADMIN 전용 API가 있지만, 지금 요청하신 화면(작품/신청/전시개설/플랜)과 거리가 있어서 이름만 적어둡니다. 필요하면 말씀해 주시면 상세 스펙 뽑아드릴게요.

- 메인 배너 관리: `POST/PUT/DELETE /mainbanner`
- BTS(제작기) 관리: `POST/PATCH/PUT/DELETE /{exhibitionId}/bts`
- 전시 지도/테마/스플래시/host(주최) 관리
- 파트너(단체/구성원) 관리

## 9. 백엔드가 먼저 만들어야 하는 것 (정리)

1. **작품 전체 목록 조회** (숨김/비공개/플랜초과 포함, 필터 가능)
2. **전시를 가로지르는 작가 참여 신청 전체 조회** (지금은 전시별로만 가능)
3. (선택) `GET /subscriptions` 응답에 결제 금액(`paidAmount`) 추가
