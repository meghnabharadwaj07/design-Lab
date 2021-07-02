import { Context, BindingDefinition, TraceContext, ExecutionContext } from '@azure/functions';

const logger: any = function (...args: any[]) {
};

logger.error = (...args: any[]) => { };
logger.warn = (...args: any[]) => { };
logger.info = (...args: any[]) => { };
logger.verbose = (...args: any[]) => { };

const defaultContext: Context = {
    log: logger,
    invocationId: '',
    executionContext: {} as ExecutionContext,
    bindings: {} as any,
    bindingData: {} as any,
    traceContext: {} as TraceContext,
    bindingDefinitions: {} as BindingDefinition[],
    done: (err?:string, result?:any) => {
        console.log(err);
    },
    req: undefined,
    res: undefined
};

export default defaultContext;
