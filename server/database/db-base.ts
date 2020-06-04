export type Constructor<T = {}> = new (...args: any[]) => T;
export type AnyFunction<A = any> = (...input: any[]) => A
export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>
export type GenericObj<T=any> = {[key: string]: T};
export function applyMixins<T extends Constructor>(derivedCtor: T, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        const c = new baseCtor();
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            const property = (Object.getOwnPropertyDescriptor(baseCtor.prototype, name) as PropertyDescriptor)!.value;
            Object.defineProperty(
                derivedCtor.prototype, 
                name, {
                    configurable: true,
                    enumerable: false,
                    get() {
                        return property.bind(c);
                    }
                });
        });
    });
}

// function DBMixins<TBase extends Constructor, F extends AnyFunction>(base: TBase, addons: F[]){
//     if(addons.length == 0){
//         return base;
//     }
//     const addon = addons.pop();
    
//     return addon(DBMixins(base, addons))
// }

export interface DbPropertyContext {
    raw: string;
    rendered: string;
}

export interface LinkMeta extends GenericObj {
    href: string;
    name?: string;
    template?: boolean;
}

export interface Link extends GenericObj{
	self?: LinkMeta[];
	collection?: LinkMeta[];
    about?: LinkMeta[];
    curies?: LinkMeta[];
    "wp:post_type"?: LinkMeta[];
    "wp:items"?: LinkMeta[];
}

export type DbPayload<T> = [T, Error];

export class ContextProporty {
    protected toPropertyContext(...strs: (string | DbPropertyContext)[] ): DbPropertyContext[] {
       return strs.map(str => {
        if(typeof str != 'string'){
            return str;
        }
        return str ? {
            raw: str,
            rendered: str
        } : null
       })
    }
}
// export interface DbPayload {
//     error: Error;
//     [key: string]: any;
// }