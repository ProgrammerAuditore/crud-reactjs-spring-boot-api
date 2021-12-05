import React, { Component } from 'react';
import EmpleadoService from '../services/EmpleadoService';
import { Link, Outlet } from 'react-router-dom';

class ListarEmpleados extends Component{

    constructor(props){
        super(props);

        this.state = {
            empleados : []
        }

        this.fncRegistrarEmpleado = this.fncRegistrarEmpleado.bind(this);
        this.fncActualizarEmpleado = this.fncActualizarEmpleado.bind(this);
        this.fncEliminarEmpleado = this.fncEliminarEmpleado.bind(this);
    }

    componentDidMount(){
        EmpleadoService.getEmpleados()
        .then((res) => {
            this.setState({ empleados : res.data });
        });
    }

    fncActualizarEmpleado(empleadoId){
        const urlActual = window.location.pathname; 
        const path = `${urlActual}/actualizar/${empleadoId}`;
        window.location.href = path;
    }

    fncEliminarEmpleado(empleadoId){
        EmpleadoService.deleteEmpleado(empleadoId)
        .then((resp) => {
            window.location.href = "/empleados";
        }).catch((resp) => {
            window.location.href = "/empleados";
        });
    }

    fncRegistrarEmpleado(){
        const urlActual = window.location.pathname; 
        const path = `${urlActual}/registrar`;
        window.location.href = path;
    }
    
    render(){
        return (<div>
            <h2 className="text-center">Lista de empleados</h2>
            <button
            onClick={this.fncRegistrarEmpleado}
            className="btn btn-primary btn-sm m-2" role="button">
                Registrar empleado
            </button>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Puesto</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.empleados.map( 
                            (empleado) => {
                                return <tr key={empleado.id}>
                                    <td>{empleado.id}</td>
                                    <td>{empleado.nombre}</td>
                                    <td>{empleado.puesto}</td>
                                    <td>{empleado.email}</td>
                                    <td>
                                        <button 
                                        onClick={() => this.fncActualizarEmpleado(empleado.id)}
                                        className="btn btn-warning btn-sm" role="button">
                                            Editar
                                        </button>{" "}
                                        <button 
                                        onClick={() => this.fncEliminarEmpleado(empleado.id)}
                                        className="btn btn-danger btn-sm" role="button">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>);
    }
}

export default ListarEmpleados;