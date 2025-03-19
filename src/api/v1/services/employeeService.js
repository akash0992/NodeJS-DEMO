import pool from "../../db/index.js";

export const getAllEmployees = async () => {
    try {
        const response = await pool.query('SELECT * FROM emp');
    // console.log('query response');
    return {
        success: true,
        data: response.rows,
    }
    } catch (err) {
        return {
            success: false,
            err,
        }
    }
}

export const saveEmployee = async (body) => {
    try {
        const {
            name,
            department_id,
            salary
        } = body;
        const response = await pool.query('INSERT INTO emp (name, department_id, salary) VALUES ($1,$2,$3)', [name, department_id, salary]);
    if (response.rowCount) {
        return {
            success: true,
            message: 'Employee saved',
        }
    } else throw new Error("Error while saving employees data")
    } catch (err) {
        return {
            success: false,
            err,
        }
    }
}
export const updateEmployee = async (body) => {
    try {
        const {
            id,
            name,
            department_id,
            salary
        } = body;
        const response = await pool.query('UPDATE emp set name=$1, department_id=$2, salary=$3 WHERE id=$4', [name, department_id, salary, id]);
        console.log('update response ', response);
    if (response.rowCount) {
        return {
            success: true,
            message: `Employee ${id} updated`,
        }
    } else throw new Error(`Error while updating employee ${id}`)
    } catch (err) {
        return {
            success: false,
            err,
        }
    }
}

export const deleteEmployee = async (id) => {
    try {
        const response = await pool.query('DELETE FROM emp WHERE id=$1', [id]);
        console.log('delete response ', response);
    if (response.rowCount) {
        return {
            success: true,
            message: `Employee ${id} deleted`,
        }
    } else throw new Error(`Error while deleting employee ${id}`)
    } catch (err) {
        return {
            success: false,
            err,
        }
    }
}