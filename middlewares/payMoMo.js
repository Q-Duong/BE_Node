const axios = require('axios').default
const crypto = require('crypto');

async function payMoMo (req, res) {
    try {
        var partnerCode = "MOMOKJ7O20220712";
        var accessKey = "uyBDCk92cx69Iygt";
        var secretkey = "lJLV7ECW8QbM3fNCVvgJPNLtY160g1D4";
        var requestId = req.exportOrder._id;
        var orderId = req.exportOrder._id;
        var orderInfo = "pay with MoMo";
        var redirectUrl = "https://7b5e-183-80-239-100.ap.ngrok.io/test";
        var ipnUrl = "https://7b5e-183-80-239-100.ap.ngrok.io";
        var amount = req.exportOrder.totalBill.toString();
        var requestType = "captureWallet"
        var extraData = ""; //pass empty value if your merchant does not have stores
    
        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        var rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType
        //puts raw signature
    
        //signature
        var signature = crypto.createHmac('sha256', secretkey)
            .update(rawSignature)
            .digest('hex');
    
        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
            partnerCode : partnerCode,
            accessKey : accessKey,
            requestId : requestId,
            amount : amount,
            orderId : orderId,
            orderInfo : orderInfo,
            redirectUrl : redirectUrl,
            ipnUrl : ipnUrl,
            extraData : extraData,
            requestType : requestType,
            signature : signature,
            lang: 'en'
        });
        //Create the HTTPS objects
        const options = {
            baseURL: 'https://test-payment.momo.vn',
            port: 443,
            url: '/v2/gateway/api/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody),
            },
            data: requestBody
        }
        //Send the request and get the response
        const requestMoMo = await axios(options)
    
        return res.status(201).json({payUrl: requestMoMo.data.payUrl})
    } catch (error) {
        return res.status(500).json({message: error.toString()})
    }
}

module.exports = {payMoMo}