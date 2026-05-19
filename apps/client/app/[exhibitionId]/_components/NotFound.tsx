interface NotFoundProps {
	message: string;
}

export const NotFound = ({ message }: NotFoundProps) => (
	<div className="flex flex-1 items-center justify-center text-center text-body1 text-lightest">
		<p>{message}</p>
	</div>
);
