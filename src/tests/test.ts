import { setNestedValue } from '../index'
import { deepMerge, generateJson, getNestedValue } from '../index2';

function test() {
    const json = {}
    // setNestedValue(json, "hoge.fuga.piyo", 100);
    setNestedValue(json, "hoge.fuga.0", 100);
    console.log(json)

    setNestedValue(json, "hoge.fuga.1", 200);
    console.log(json)

    setNestedValue(json, "bar.0.piyo", 300);
    console.log(json)

    setNestedValue(json, "bar.2.piyo", 400);
    console.log(json)
}

function test2() {
    const keyArray = ["hoge", "fuga", "0"]
    const result = getNestedValue(keyArray, 100);
    console.log(result)
}

function test3() {
    const a = { huga: { piyo: [{ "a": 10 }] }, hoge: "hhhh", agya: 10 }
    const b = { huga: { piyo: [{ "a": 20 }] }, poge: "yeah" }

    console.log(JSON.stringify(deepMerge(a, b), null, 2))
}

function test4() {
    const keys = ["fuga.piyo", "hoge", "poyo.0", "poyo.1", "poyo.2", "fuga.pago.boke", "fuga.pago.poge"];
    const testData = [
        ["1", "10", 10, 20, 30, "999", "aaa"],
        ["2", "20", 40, 50, 60, "199", "bbb"],
    ];

    testData.forEach((row) => console.log(JSON.stringify(generateJson(keys, row), null, 2)));
}

test4();