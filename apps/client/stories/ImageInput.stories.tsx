import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ImageInput } from "@/components/common/ImageInput/ImageInput";

const GRAY_IMAGE =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Crect width='100%25' height='100%25' fill='%23ecedee'/%3E%3C/svg%3E";

const meta = {
	title: "UI/ImageInput",
	component: ImageInput,
	tags: ["autodocs"],
	args: {
		images: [],
		onAdd: () => {},
		onRemove: () => {},
	},
} satisfies Meta<typeof ImageInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
	render: () => {
		const [images, setImages] = useState<string[]>([]);

		return (
			<div className="w-full min-[721px]:w-[470px]">
				<ImageInput
					images={images}
					maxCount={1}
					onAdd={(files) => setImages(files.map((file) => URL.createObjectURL(file)))}
					onRemove={() => setImages([])}
				/>
			</div>
		);
	},
};

export const SingleUploaded: Story = {
	render: () => {
		const [images, setImages] = useState<string[]>([GRAY_IMAGE]);

		return (
			<div className="w-full min-[721px]:w-[470px]">
				<ImageInput
					images={images}
					maxCount={1}
					onAdd={(files) => setImages(files.map((file) => URL.createObjectURL(file)))}
					onRemove={() => setImages([])}
				/>
			</div>
		);
	},
};

export const Multiple: Story = {
	render: () => {
		const [images, setImages] = useState<string[]>([GRAY_IMAGE, GRAY_IMAGE]);

		return (
			<div className="w-full min-[721px]:w-[470px]">
				<ImageInput
					images={images}
					maxCount={5}
					onAdd={(files) =>
						setImages((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))])
					}
					onRemove={(index) => setImages((prev) => prev.filter((_, i) => i !== index))}
				/>
			</div>
		);
	},
};

export const MultipleFullUploaded: Story = {
	render: () => {
		const [images, setImages] = useState<string[]>(Array.from({ length: 5 }, () => GRAY_IMAGE));

		return (
			<div className="w-full min-[721px]:w-[470px]">
				<ImageInput
					images={images}
					maxCount={5}
					onAdd={(files) =>
						setImages((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))])
					}
					onRemove={(index) => setImages((prev) => prev.filter((_, i) => i !== index))}
				/>
			</div>
		);
	},
};
