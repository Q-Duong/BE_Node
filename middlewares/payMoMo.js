const axios = require('axios').default
const crypto = require('crypto');
const config = process.env
async function payMoMo (req, res) {
    try {
        const partnerCode = config.PARTNER_CODE;
        const accessKey = config.ACCESS_KEY;
        const secretkey = config.SECRET_KEY;
        const requestId = req.exportOrder._id;
        const orderId = req.exportOrder._id;
        const orderInfo = "pay with MoMo";
        const ipnUrl = config.IPN_URL;
        const redirectUrl = config.REDIRECT_URL;
        const amount = req.exportOrder.totalBill.toString();
        const requestType = "captureWallet"
        const extraData = `${req.payment._id}splitString${req.accessToken}`; //pass empty value if your merchant does not have stores
    
        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        const rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType
        //puts raw signature
    
        //signature
        const signature = crypto.createHmac('sha256', secretkey)
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
        console.log(error)
        return Promise.reject({message: error.toString()})
    }
}

module.exports = {payMoMo}