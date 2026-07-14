
function GrowableByteBuffer() {
	this.size = 16;
	this.data = PixelUtil.allocBytes(16);
}

GrowableByteBuffer.prototype.ensureCapacity = function (l, d) {
	if (l + d <= this.size) return;
	var _local4835 = this.size;
	while (l + d > this.size) this.size *= 2;
	var _local4836 = PixelUtil.allocBytes(this.size);
	for (var _local4834 = 0; _local4834 < _local4835; _local4834++) _local4836[_local4834] = this.data[_local4834];
	this.data = _local4836;
};
