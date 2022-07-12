const {Router} = require('express');
const router = Router({ mergeParams: true })

router
.get('/', async (req, res) => {
    try {
        var partnerCode = "MOMOUR2S20210830";
        var accessKey = "zV8bQQqebfkOpXm8";
        var secretkey = "URjMechix19xzhkqAP7Ev1Zhqyo5ZWEt";
        var requestId = partnerCode + new Date().getTime();
        var orderId = requestId;
        var orderInfo = "pay with MoMo";
        var redirectUrl = "https://7b5e-183-80-239-100.ap.ngrok.io/test";
        var ipnUrl = "https://7b5e-183-80-239-100.ap.ngrok.io";
        var amount = "50000";
        var requestType = "captureWallet"
        var extraData = ""; //pass empty value if your merchant does not have stores
    
        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        var rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType
        //puts raw signature
    
        //signature
        const crypto = require('crypto');
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
        // res.header('Access-Control-Allow-Origin','*')
        // res.header('Access-Control-Allow-Methods',['GET','OPTIONS'])
        return res.status(200).json(requestMoMo.data.payUrl)
    } catch (error) {
        console.log(error)
    }
})

module.exports = {router}