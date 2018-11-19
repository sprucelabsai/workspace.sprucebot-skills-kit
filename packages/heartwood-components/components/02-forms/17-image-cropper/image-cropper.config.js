const Classes = require('../../classes')

module.exports = {
	title: 'Image Cropper',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${
			item.handle
		} -->\n<div style="margin-bottom: 3rem;">${markup}</div>\n<!-- End: @${
			item.handle
		} -->\n`
	},
	context: {
		uploadBtnText: 'Add Image',
		isSmall: true,
		isCircular: true,
		defaultIcon:
			'<path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M26.8333 27.834C26.8333 27.2817 27.281 26.834 27.8333 26.834H53.8333C54.3855 26.834 54.8333 27.2817 54.8333 27.834V53.834C54.8333 54.3863 54.3855 54.834 53.8333 54.834H27.8333C27.281 54.834 26.8333 54.3863 26.8333 53.834V27.834Z" stroke="#737780" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M36.4583 39.667C38.3913 39.667 39.9583 38.1 39.9583 36.167C39.9583 34.234 38.3913 32.667 36.4583 32.667C34.5253 32.667 32.9583 34.234 32.9583 36.167C32.9583 38.1 34.5253 39.667 36.4583 39.667Z" stroke="#737780" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M54.8333 49.5843L49.2543 41.2147C48.9337 40.7332 48.3958 40.4412 47.8174 40.4347C47.2389 40.4281 46.6947 40.7079 46.3633 41.182L41.6966 47.8343L38.8126 45.5267C38.4292 45.2207 37.935 45.0895 37.4503 45.1649C36.9656 45.2403 36.5346 45.5154 36.2623 45.9233L30.3333 54.8343" stroke="#737780" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M17.4999 21.0003C22.9767 21.0003 27.4166 16.5605 27.4166 11.0837C27.4166 5.60683 22.9767 1.16699 17.4999 1.16699C12.0231 1.16699 7.58325 5.60683 7.58325 11.0837C7.58325 16.5605 12.0231 21.0003 17.4999 21.0003Z" stroke="#737780" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M19.8333 24.6658C15.1433 23.9928 10.392 25.3881 6.8106 28.4901C3.22916 31.592 1.16999 36.0955 1.16663 40.8335H19.8333" stroke="#737780" stroke-linecap="round" stroke-linejoin="round"/>'
	},
	variants: [
		{
			name: 'Rectangle',
			context: {
				isCircular: false,
				defaultIcon:
					'<path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M8.60767 4.66699C7.6399 4.66746 6.77287 5.26529 6.42834 6.16966L2.73934 15.8483C2.34388 16.8873 2.3323 18.0333 2.70667 19.08C3.76111 22.0151 6.77272 23.7676 9.84557 23.2342C12.9184 22.7008 15.1632 20.0358 15.1667 16.917C15.1667 20.4608 18.0395 23.3337 21.5833 23.3337C25.1272 23.3337 28 20.4608 28 16.917C28 20.4608 30.8728 23.3337 34.4167 23.3337C37.9605 23.3337 40.8333 20.4608 40.8333 16.917C40.8368 20.0358 43.0816 22.7008 46.1544 23.2342C49.2273 23.7676 52.2389 22.0151 53.2933 19.08C53.6682 18.0332 53.6558 16.8868 53.2583 15.8483L49.5717 6.16966C49.2271 5.26529 48.3601 4.66746 47.3923 4.66699L8.60767 4.66699Z" stroke="#737780" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M11.5663 30.834C11.5663 30.5578 11.7901 30.334 12.0663 30.334H27.3996C27.6758 30.334 27.8996 30.5578 27.8996 30.834V43.834C27.8996 44.1101 27.6758 44.334 27.3996 44.334H12.0663C11.7901 44.334 11.5663 44.1101 11.5663 43.834V30.834Z" stroke="#737780" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M32.5663 51.334V31.5007C32.5663 30.8563 33.0886 30.334 33.733 30.334H43.0663C43.7106 30.334 44.233 30.8563 44.233 31.5007V51.334" stroke="#737780" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M48.8997 23.1185V48.9998C48.8997 50.2885 47.855 51.3332 46.5663 51.3332H9.23299C7.94433 51.3332 6.89966 50.2885 6.89966 48.9998V23.0625" stroke="#737780" stroke-linecap="round" stroke-linejoin="round"/>'
			}
		}
	]
}
