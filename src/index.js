const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        success: true,
	test: "TEST"
    });
});

app.listen(PORT, () => {
    console.log(`server is listening at localhost:${PORT}`);
});
