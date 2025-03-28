const pool = require('../config/conexionAsync');

async function getPedidosByMatricula(matricula) {
    const checkQuery = 'SELECT * FROM alumno WHERE matricula = ?';
    const [existingAlumno] = await pool.query(checkQuery, [matricula]);

    if (existingAlumno.length < 1) {
        return null;
    } else {
        const query = `
        SELECT p.id_pedido,
            p.identificador_pago,
            p.identificador_pedido,
            p.sku,
            pr.producto AS nombre_producto,
            pr.concepto AS concepto,
            p.id_cat_estatus,
            ce.descripcion AS estatus,
            p.pago_descuento,
            p.fecha_vigenica_descuento,
            p.pago,
            p.fecha_vigencia_pago,
            p.pago_recargo,
            p.fecha_vigencia_recargo,
            p.fecha_carga,
            p.concepto AS concepto_pedido,
            p.transaccion_Id,
            p.link_de_pago,
            a.matricula,
            a.open_pay_id,
            a.nombre AS nombre_alumno,
            a.apellido_paterno,
            a.apellido_materno,
            a.email,
            a.celular
        FROM pedidos p
        JOIN alumno a ON p.id_alumno = a.id_alumno
        JOIN productos pr ON p.sku = pr.sku
        JOIN cat_estatus ce ON p.id_cat_estatus = ce.id_cat_estatus
        WHERE a.matricula = ? AND p.id_cat_estatus != 1;
        `;
       
        try {
            const [result] = await pool.query(query, [matricula]);
            return result;
        } catch (error) {
            console.error("Error al obtener pedidos por matrícula:", error);
            throw new Error("Error al obtener pedidos por matrícula");
        }
    }
}


async function getPedidosAllMatricula() {
    
        const query = `
        SELECT p.id_pedido,
            p.identificador_pago,
            p.identificador_pedido,
            p.sku,
            pr.producto AS nombre_producto,
            pr.concepto AS concepto,
            p.id_cat_estatus,
            ce.descripcion AS estatus,
            p.pago_descuento,
            p.fecha_vigenica_descuento,
            p.pago,
            p.fecha_vigencia_pago,
            p.pago_recargo,
            p.fecha_vigencia_recargo,
            p.fecha_carga,
            p.concepto AS concepto_pedido,
            p.transaccion_Id,
            p.link_de_pago,
            a.matricula,
            a.open_pay_id,
            a.nombre AS nombre_alumno,
            a.apellido_paterno,
            a.apellido_materno,
            a.email,
            a.celular
        FROM pedidos p
        JOIN alumno a ON p.id_alumno = a.id_alumno
        JOIN productos pr ON p.sku = pr.sku
        JOIN cat_estatus ce ON p.id_cat_estatus = ce.id_cat_estatus
        WHERE p.id_cat_estatus != 1
        AND identificador_pago IS NOT NULL 
        AND identificador_pago != '';
        `;
       
        try {
            const [result] = await pool.query(query);
             
            if (!result || result.length === 0) {
                console.log("No se encontraron pedidos con matrícula.");
                return [];
            }

            return result;
        } catch (error) {
            console.error("Error al obtener todos los pedidos por matrícula:", error);
            throw new Error("Error al obtener todos los pedidos por matrícula");
        }
   
}

async function getMyMatricula(matricula) {
   
        const query = `
        SELECT * FROM alumno WHERE matricula = ?;
        `;
        try {
            const [result] = await pool.query(query, [matricula]);
           
            if (result.length < 1) {
                return null;
            } else {
                return result;
            }
        } catch (error) {
            console.error("Error al obtener la matrícula:", error);
            throw new Error("Error al obtener la matrícula");
        }
    
}

async function getMyOpenPay(customer_id) {
    const query = `
    SELECT * FROM alumno WHERE open_pay_id = ?;
    `;

    try {
        const [result] = await pool.query(query, [customer_id]);
       
        if (result.length < 1) {
            return null;
        } else {
            return result[0];
        }
    } catch (error) {
        console.error("Error al obtener la matrícula:", error);
        throw new Error("Error al obtener la matrícula");
    }
}

module.exports = {
    getPedidosByMatricula,
    getMyMatricula,
    getMyOpenPay,
    getPedidosAllMatricula
};