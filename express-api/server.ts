const express = require('express');
const { plainAddPlaceholder } = require('@signpdf/placeholder-plain');
const P12Signer = require('@signpdf/signer-p12').P12Signer;
const signpdf = require('@signpdf/signpdf').default;
const forge = require('node-forge');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Hello World!'
    });
});

async function prepararPDF(pdfBuffer, p12Buffer){
    
    const pdfDoc = plainAddPlaceholder({
        pdfBuffer: pdfBuffer,
        reason: 'Firma de prueba',
        contactInfo: '',
        name: 'John Doe',
        location: 'Buenos Aires',
        signatureLength: p12Buffer.length,
    })

    return pdfDoc;
}

function extractPrivateKeyFromP12(p12Buffer, password){
    const p12Asn1 = forge.asn1.fromDer(p12Buffer.toString('binary'));
    const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, password);

    const bags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
    const bag = bags[forge.pki.oids.pkcs8ShroudedKeyBag][0];
    const privateKey = forge.pki.privateKeyToPem(bag.key);

    return Buffer.from(privateKey);
}

app.post('/firmar-pdf', upload.fields([{name:'pdf'},{name:'p12'}]), async (req, res) => {

    try {
        const pdfBuffer = req.files['pdf'][0].buffer;
        const p12Buffer = req.files['p12'][0].buffer;
        const password = req.body.password;
        const privateKey = extractPrivateKeyFromP12(p12Buffer, password);
        const signer = new P12Signer(p12Buffer, {passphrase:password});
        const pdfWithPlaceholder = await prepararPDF(pdfBuffer, p12Buffer);

        const signedBuffer =  await signpdf.sign(pdfWithPlaceholder, signer)

        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="pdf-firmado.pdf"',
            'Content-Length': signedBuffer.length
        });
        res.end(signedBuffer);

    } catch (error) {
        console.error('error: ',error)
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

