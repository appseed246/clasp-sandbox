/**
 * エントリポイントの関数
 */
function main() {
    generateJsonFromSheet()
}

function generateJsonFromSheet() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const range = sheet.getDataRange();
    const values = range.getValues();

    // JSONを生成
    const json = {};
    const keys = values[0]; // 1行目はキー情報

    for (let i = 1; i < values.length; i++) {
        const row = values[i]; // データ行
        keys.forEach((key, index) => {
            const value = row[index];
            setNestedValue(json, key, value);
        });
    }

    // 結果のJSONをログ出力
    console.log(JSON.stringify(json, null, 2));
    return json;
}

export function setNestedValue(obj: Object, path: string, value: any) {
    const keys = path.split('.');
    let current: Object | string | number | any[] = obj;

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const keyNext: string | null = i != keys.length - 1 ? keys[i + 1] : null;
        const isLast = i === keys.length - 1;

        if (isLast) {
            // 数値インデックスと解釈されるキーで配列に値をセット
            if (isArrayIndex(key)) {
                const index = parseInt(key, 10);
                // 現在の位置が配列でなければ初期化
                if (!Array.isArray(current)) {
                    current = [];
                }
                current[index] = value;
            } else {
                current[key] = value;
            }
        } else {
            if (isArrayIndex(key)) {
                const index = parseInt(key, 10);
                // 配列の初期化または既存配列の使用
                if (!Array.isArray(current)) {
                    current = [];
                }
                current[index] = current[index] || {};
                current = current[index];
            } else {
                // console.log("key", key)
                // console.log("current[key]", current[key])
                if (current[key] == null && keyNext != null) {
                    current[key] = isArrayIndex(keyNext) ? [] : {}
                }
                current = current[key];
            }
        }
    }
}

function isArrayIndex(key: string) {
    const number = parseInt(key, 10);
    return !isNaN(number) && number.toString() === key;
}
