import {uniqueId} from 'lodash'
import {createInjector} from './create-injector'
import type {InjectionKey} from "vue";

interface Injectable<T, A extends any[]> {
    provide(...args: A): T

    inject(): T
}

export function createInjectable<T, A extends any[]>(
    factory: (...args: A) => T,
    prefix = 'injectable'
): Injectable<T, A> {
    const key: InjectionKey<T> = Symbol.for(uniqueId(prefix))

    function provideData(...args: A) {
        const data = factory(...args)

        provide(key, data)

        return data
    }

    const inject = createInjector(key)

    return {
        inject,
        provide: provideData
    }
}
