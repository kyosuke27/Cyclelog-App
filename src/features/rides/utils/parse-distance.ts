export function parseDistance(inputRaw: string): number {
	const value = inputRaw.trim();
	if (value == "") throw new Error("距離を入力");
	if (!/^(?:\d+(?:\.\d{0,3})?|\.\d{1,3})$/.test(value)) {
		throw new Error("入力値は少数第三位までの正の数で入力");
	}
	const meters = Math.round(Number(value) * 1000);
	// 数値に変換可能か？
	// 1<数値<1000000の範囲になっているか？
	if (!Number.isSafeInteger(meters) || meters < 1 || meters > 1_000_000) {
		throw new Error("距離は0.001〜1000 kmの範囲で入力してください。");
	}
	return meters;
}
