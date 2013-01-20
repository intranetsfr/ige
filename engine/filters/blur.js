IgeFilters.blur = function (canvas, ctx, originalImage, texture, data) {
	if (!texture._filterImageDrawn || !data || !data.cumulative) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(originalImage, 0, 0);
		texture._filterImageDrawn = true;
	}

	var strength = 1,
		loop,
		oneNinth = 1 / 9,
		pixelData;

	pixelData = ctx.getImageData(
		0,
		0,
		canvas.width,
		canvas.height
	);

	if (data && data.value) {
		strength = data.value;
	}

	for (loop = 0; loop < strength; loop++) {
		pixelData = IgeFilters._convolute(
			pixelData,
			[
				oneNinth, oneNinth, oneNinth,
				oneNinth, oneNinth, oneNinth,
				oneNinth, oneNinth, oneNinth
			]
		);
	}

	// Put the new pixel data
	ctx.putImageData(
		pixelData,
		0,
		0
	);
};