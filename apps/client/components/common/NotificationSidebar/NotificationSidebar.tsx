"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { Fragment } from "react";
import { cn } from "@/lib/utils/cn";

export interface NotificationItem {
	id: number;
	title: string;
	description: string;
	createdAt: string;
	isRead: boolean;
}

interface NotificationSidebarProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	notifications: NotificationItem[];
}

const relativeTime = new Intl.RelativeTimeFormat("ko", { numeric: "always" });

const formatRelativeTime = (iso: string) => {
	const minutes = Math.round((new Date(iso).getTime() - Date.now()) / 60000);
	if (minutes > -60) return relativeTime.format(Math.min(minutes, -1), "minute");
	const hours = Math.round(minutes / 60);
	if (hours > -24) return relativeTime.format(hours, "hour");
	return relativeTime.format(Math.round(hours / 24), "day");
};

export const NotificationSidebar = ({
	open,
	onOpenChange,
	notifications,
}: NotificationSidebarProps) => (
	<Dialog.Root open={open} onOpenChange={onOpenChange}>
		<Dialog.Portal>
			<Dialog.Overlay className="fixed inset-0 z-100 hidden bg-deemed min-[721px]:block" />
			<Dialog.Content
				aria-describedby={undefined}
				className="fixed inset-0 z-101 flex flex-col bg-normal outline-none min-[721px]:inset-y-7 min-[721px]:right-8 min-[721px]:left-auto min-[721px]:w-[38%] min-[721px]:min-w-100 min-[721px]:rounded-3xl min-[721px]:bg-elevate"
			>
				<div className="flex h-11 shrink-0 items-center gap-2 border-b border-stroke-lightest px-4 min-[721px]:hidden">
					<Dialog.Close aria-label="뒤로가기" className="cursor-pointer">
						<Image src="/icons/backBtn.svg" alt="" width={24} height={24} />
					</Dialog.Close>
					<Dialog.Title className="text-body1-bold text-strong">알림</Dialog.Title>
				</div>

				<div className="hidden shrink-0 items-center justify-between px-8 pt-8 pb-6 min-[721px]:flex">
					<p className="font-bold text-[32px] text-strong leading-10.5 tracking-[-0.02em]">알림</p>
					<Dialog.Close aria-label="닫기" className="cursor-pointer">
						<Image src="/icons/close.svg" alt="" width={32} height={32} />
					</Dialog.Close>
				</div>

				<ul className="flex-1 overflow-y-auto px-4 min-[721px]:px-8">
					{notifications.map((notification, index) => (
						<Fragment key={notification.id}>
							{index === 0 && <li aria-hidden className="h-px bg-stroke-lightest" />}
							<li className="flex py-4 pl-4">
								{!notification.isRead && (
									<span className="mr-4 flex size-6 shrink-0 items-center justify-center">
										<span className="size-1.5 rounded-full bg-error" />
									</span>
								)}
								<div className="flex min-w-0 flex-col">
									<p
										className={cn(
											"text-body1-bold min-[721px]:font-semibold min-[721px]:text-[19px] min-[721px]:leading-7",
											notification.isRead ? "text-lighter" : "text-light",
										)}
									>
										{notification.title}
									</p>
									<p
										className={cn(
											"text-body2 min-[721px]:text-body1",
											notification.isRead ? "text-lightest" : "text-lighter",
										)}
									>
										{notification.description}
									</p>
									<p className="mt-4 text-body2 text-lightest">
										{formatRelativeTime(notification.createdAt)}
									</p>
								</div>
							</li>
							<li aria-hidden className="h-px bg-stroke-lightest" />
						</Fragment>
					))}
				</ul>

				<p className="shrink-0 px-4 py-6 text-body1 text-lightest min-[721px]:px-8 min-[721px]:pt-4 min-[721px]:pb-7">
					30일이 지난 알람은 삭제됩니다.
				</p>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
);
