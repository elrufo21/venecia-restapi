import { pool } from "../db.js"

export const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM users`)
        res.json(rows);

    } catch (error) {

        return res.status(500).json({
            message: "Something goes wrong"
        })

    }

}

export const getUser = async (req, res) => {

    try {

        const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, req.params.id)
        if (rows.length <= 0) return res.status(404).json({
            message: "User not found"
        })
        res.json(rows[0])

    } catch (error) {

        return res.status(500).json({
            message: "Something goes wrong"
        })

    }
}

export const createUser = async (req, res) => {
    try {
        const { name, lastname, username, password, phone } = req.body

        const [rows] = await pool.query(`INSERT INTO users (name,lastname,username,password,phone) 
    VALUES (?,?,?,?,?) `, [name, lastname, username, password, phone])

        res.send({
            id: rows.insertId,
            name,
            lastname,
            username,
            password,
            phone
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong"
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?',
            [req.params.id])

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: "User not found" })
        }

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong"
        })
    }

}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, lastname, username, password, phone } = req.body

        const [result] = await pool.query(`UPDATE users SET 
                        name=IFNULL(?,name), lastname=IFNULL(?,lastname), username=IFNULL(?,username), password=IFNULL(?,password), phone=IFNULL(?,phone)
                        WHERE id = ?` , [name, lastname, username, password, phone, id])

        if (result.affectedRows === 0) return res.status(404).json({
            message: "User not found"
        })
        const [rows] = await pool.query("SELECT * FROM users WHERE id=?", [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong"
        })
    }
}
