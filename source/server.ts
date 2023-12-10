import http from 'http';
import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import routes from './routes/index';

const router: Express = express();

router.use(morgan('dev'));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Acess-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({'Deu Certo': 'Sim'});
    }

    next();
});


router.use('/', routes)

router.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Página não encontrada');
    return res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 3000;
httpServer.listen(PORT, () => console.log(`Servidor rodando da porta ${PORT}`));