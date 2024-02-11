/**
 * エントリポイントの関数
 */
function main() {
    console.log("hello, world.")
}

/**
 * 特定の範囲の値を取得する。
 */
function getRangeValues() {
    // スプレッドシートを開く
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    // "Sheet1" という名前のシートを取得
    const sheet = spreadsheet.getSheetByName("Sheet1");
    if (!sheet) {
        throw new Error('Sheet "Sheet1" not found.');
    }
    // A1:C3 の範囲を取得
    const range = sheet.getRange("A1:C3");
    // 範囲の値を取得
    const values = range.getValues();

    // 値をログに出力（デバッグ用）
    console.log(values);

    // 必要に応じて値を返すか、他の操作を行う
    // [[1.0, 2.0, 3.0], [AAA, BBB, CCC], [XXX, YYY, ZZZ]]
    return values;
}
