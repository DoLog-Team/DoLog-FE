"use client";

import { useRouter } from "next/navigation";
import { ProfileEditForm } from "./_components/ProfileEditForm";
import { MOCK_PROFILE_FORM } from "./_mocks/profile";

export default function ProfileEditPage() {
	const router = useRouter();

	return <ProfileEditForm initialValue={MOCK_PROFILE_FORM} onBack={() => router.back()} />;
}
