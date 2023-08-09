var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");

var recetasModel = require("../database/recetasModel");

var cloudinary = require("cloudinary").v2;

/* GET home page. */
router.get("/", async function (req, res, next) {
  recetasCol1 = await recetasModel.getRecetasCol1();
  recetasCol2 = await recetasModel.getRecetasCol2();
  recetasCol3 = await recetasModel.getRecetasCol3();
  recetasCol4 = await recetasModel.getRecetasCol4();
  recetasCol5 = await recetasModel.getRecetasCol5();
  recetasCol1 = recetasCol1.map((receta) => {
    if (receta.imagen_ID) {
      let imagen = cloudinary.url(receta.imagen_ID, {
        crop: "fill",
      });
      return {
        ...receta,
        imagen,
      };
    } else {
      return {
        ...receta,
        imagen: "/images/cards/no-image.png",
      };
    }
  });
  recetasCol2 = recetasCol2.map((receta) => {
    if (receta.imagen_ID) {
      let imagen = cloudinary.url(receta.imagen_ID, {
        crop: "fill",
      });
      return {
        ...receta,
        imagen,
      };
    } else {
      return {
        ...receta,
        imagen: "/images/cards/no-image.png",
      };
    }
  });

  recetasCol3 = recetasCol3.map((receta) => {
    if (receta.imagen_ID) {
      let imagen = cloudinary.url(receta.imagen_ID, {
        crop: "fill",
      });
      return {
        ...receta,
        imagen,
      };
    } else {
      return {
        ...receta,
        imagen: "/images/cards/no-image.png",
      };
    }
  });

  recetasCol4 = recetasCol4.map((receta) => {
    if (receta.imagen_ID) {
      let imagen = cloudinary.url(receta.imagen_ID, {
        crop: "fill",
      });
      return {
        ...receta,
        imagen,
      };
    } else {
      return {
        ...receta,
        imagen: "/images/cards/no-image.png",
      };
    }
  });

  recetasCol5 = recetasCol5.map((receta) => {
    if (receta.imagen_ID) {
      let imagen = cloudinary.url(receta.imagen_ID, {
        crop: "fill",
      });
      return {
        ...receta,
        imagen,
      };
    } else {
      return {
        ...receta,
        imagen: "/images/cards/no-image.png",
      };
    }
  });

  res.render("index", {
    recetasCol1,
    recetasCol2,
    recetasCol3,
    recetasCol4,
    recetasCol5,
  });
});

router.post("/", async (req, res, next) => {
  var nombre = req.body.nombre;
  var email = req.body.email;
  var mensaje = req.body.mensaje;

  var obj = {
    to: "alan.diazlamberti@gmail.com",
    subject: "Contacto desde AyM",
    html:
      "Nombre:" +
      " " +
      nombre +
      "</br> Email:" +
      " " +
      email +
      "</br> Mensaje:" +
      " " +
      mensaje,
  };

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  var info = await transport.sendMail(obj);

  res.render("index", {
    sucess: "Mensaje enviado correctamente!",
    scrollToSection: true,
  });
});

module.exports = router;
