const Plus = ({ fill, width }: { fill?: string; width?: number }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={width || 100}
		fill={fill || '#4255ff'}
		viewBox='0 0 24 24'
	>
		<path
			stroke={fill || '#4255ff'}
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={2}
			d='M4 12h16m-8-8v16'
		/>
	</svg>
)
export default Plus
