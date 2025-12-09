import {close_api, delay, send, startService} from "./utils/utils.js";
import fs from 'fs';

async function qrcode() {
    let api = startService()
    await delay(2000)

    try {
        let result = await send(`/login/qr/key`, "GET", {})
        if (result.status === 1) {
            // 只输出 key
            console.log("key:", result.data.qrcode)

            // 只保存图片
            if (result.data.qrcode_img) {
                const base64Data = result.data.qrcode_img.replace(/^data:image\/\w+;base64,/, '')
                fs.writeFileSync('qrcode.png', Buffer.from(base64Data, 'base64'))
            }
        } else {
            throw new Error("请求失败")
        }
    } finally {
        close_api(api)
    }

    if (api.killed) {
        process.exit(0)
    }
}

qrcode()