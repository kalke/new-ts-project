import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

const testFunction = async (request: Request, response: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/todos/1`)
    return response.send(result.data);
}

export default testFunction;