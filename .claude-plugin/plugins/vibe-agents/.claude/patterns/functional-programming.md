# ⚡ Функциональное Программирование

## 🎯 Основа Всего

**ВЕСЬ КОД ДОЛЖЕН БЫТЬ В ФУНКЦИОНАЛЬНОМ СТИЛЕ!**

---

## 📚 Базовые Принципы

### 1. TaskEither - Асинхронные Операции

```typescript
// Тип для асинхронных операций с обработкой ошибок
type TaskEither<E, A> = () => Promise<Either<E, A>>

// Пример использования
const fetchUser = (id: string): TaskEither<Error, User> => {
  return async () => {
    try {
      const response = await fetch(`/api/users/${id}`)
      if (!response.ok) {
        return left(new Error(`HTTP ${response.status}`))
      }
      const data = await response.json()
      return right(data)
    } catch (error) {
      return left(error as Error)
    }
  }
}
```

### 2. Either - Синхронные Операции

```typescript
// Тип для синхронных операций
type Either<E, A> = Left<E> | Right<A>

interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}

interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}

// Создание Either
const left = <E, A>(error: E): Either<E, A> => ({ _tag: 'Left', left: error })
const right = <E, A>(value: A): Either<E, A> => ({ _tag: 'Right', right: value })

// Пример
const divide = (a: number, b: number): Either<Error, number> => {
  if (b === 0) return left(new Error('Division by zero'))
  return right(a / b)
}
```

### 3. Pipe - Композиция Функций

```typescript
// Простая реализация pipe
const pipe = <A, B>(fn: (a: A) => B) => (value: A): B => fn(value)

const pipe2 = <A, B, C>(
  fn1: (a: A) => B,
  fn2: (b: B) => C
) => (value: A): C => fn2(fn1(value))

// Использование
const processUser = pipe2(
  validateUser,
  transformUser
)
```

### 4. Map - Трансформация Успешного Результата

```typescript
// Для Either
const map = <E, A, B>(fn: (a: A) => B) => (
  either: Either<E, A>
): Either<E, B> => {
  if (either._tag === 'Left') {
    return either
  }
  return right(fn(either.right))
}

// Для TaskEither
const mapTaskEither = <E, A, B>(fn: (a: A) => B) => (
  taskEither: TaskEither<E, A>
): TaskEither<E, B> => {
  return async () => {
    const result = await taskEither()
    return map(fn)(result)
  }
}
```

### 5. Chain - Последовательные Операции

```typescript
// Для Either
const chain = <E, A, B>(fn: (a: A) => Either<E, B>) => (
  either: Either<E, A>
): Either<E, B> => {
  if (either._tag === 'Left') {
    return either
  }
  return fn(either.right)
}

// Пример
const parseAndValidate = chain((str: string) => {
  const number = parseInt(str)
  if (isNaN(number)) {
    return left(new Error('Not a number'))
  }
  if (number < 0) {
    return left(new Error('Negative number'))
  }
  return right(number)
})
```

### 6. Tap - Побочные Эффекты

```typescript
// Для Either
const tap = <E, A>(fn: (a: A) => void) => (
  either: Either<E, A>
): Either<E, A> => {
  if (either._tag === 'Right') {
    fn(either.right)
  }
  return either
}

// Для логирования
const logSuccess = tap((user: User) => {
  console.log('User processed:', user.id)
})
```

### 7. Иммутабельность

```typescript
// ✅ Правильно - создаём новый объект
const updateUser = (user: User, changes: Partial<User>): User => ({
  ...user,
  ...changes,
  updatedAt: new Date()
})

// ❌ Неправильно - мутируем объект
const updateUserBad = (user: User, changes: Partial<User>): void => {
  Object.assign(user, changes, { updatedAt: new Date() })
}
```

### 8. Чистые Функции

```typescript
// ✅ Чистая функция
const add = (a: number, b: number): number => a + b

// ❌ Не чистая - зависит от внешнего состояния
let counter = 0
const increment = (): number => ++counter

// ❌ Не чистая - побочные эффекты
const saveUserBad = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user))
}

// ✅ Чистая - возвращает TaskEither
const saveUser = (user: User): TaskEither<Error, void> => {
  return async () => {
    try {
      await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user)
      })
      return right(void 0)
    } catch (error) {
      return left(error as Error)
    }
  }
}
```

---

## 🛠️ Продвинутые Утилиты

### 10. Каррирование (Curry)

```typescript
// Функция для каррирования
const curry = <A extends unknown[], B>(
  fn: (...args: A) => B
) => {
  return (...args: A): B | ((...args: A) => B) => {
    if (args.length >= fn.length) {
      return fn(...args)
    }
    return curry(fn.bind(null, ...args))
  }
}

// Пример использования
const checkBalance = curry((required: number, user: User): Either<Error, User> =>
  user.balance >= required
    ? right(user)
    : left(new Error('Insufficient balance'))
)

const checkBalance10 = checkBalance(10)
const checkBalance50 = checkBalance(50)

const result1 = checkBalance10(user) // Частичное применение
const result2 = checkBalance50(user)
```

### 11. fold - Обработка Обеих Веток

```typescript
// Для Either
const fold = <E, A, B>(
  onLeft: (error: E) => B,
  onRight: (value: A) => B
) => (
  either: Either<E, A>
): B => {
  if (either._tag === 'Left') {
    return onLeft(either.left)
  }
  return onRight(either.right)
}

// Использование fold
const result = fold(
  (error) => console.error('Error:', error),
  (value) => console.log('Success:', value)
)(eitherValue)

// Для TaskEither
const foldTaskEither = <E, A, B>(
  onLeft: (error: E) => Promise<B>,
  onRight: (value: A) => Promise<B>
) => async (
  taskEither: TaskEither<E, A>
): Promise<B> => {
  const result = await taskEither()
  return fold(onLeft, onRight)(result)
}
```

### 12. eitherToTaskEither

```typescript
const eitherToTaskEither = <E, A>(
  either: Either<E, A>
): TaskEither<E, A> => {
  return async () => right(either)
}
```

### 13. taskEitherToPromise

```typescript
const taskEitherToPromise = <E, A>(
  taskEither: TaskEither<E, A>
): Promise<A> => {
  return taskEither().then(result => {
    if (result._tag === 'Left') {
      throw result.left
    }
    return result.right
  })
}
```

### 14. combine - Параллельное Выполнение

```typescript
const combine = <E, A, B>(
  taskEither1: TaskEither<E, A>,
  taskEither2: TaskEither<E, B>
): TaskEither<E, [A, B]> => {
  return async () => {
    const [result1, result2] = await Promise.all([
      taskEither1(),
      taskEither2()
    ])

    if (result1._tag === 'Left') return result1
    if (result2._tag === 'Left') return result2

    return right([result1.right, result2.right])
  }
}

// combine с произвольным количеством
const combineAll = <E, A>(
  taskEithers: TaskEither<E, A>[]
): TaskEither<E, A[]> => {
  return async () => {
    const results = await Promise.all(
      taskEithers.map(te => te())
    )

    for (const result of results) {
      if (result._tag === 'Left') {
        return result
      }
    }

    return right(results.map(r => r.right))
  }
}
```

### 15. partition - Разделение Успешных и Ошибочных

```typescript
const partition = <E, A>(
  taskEithers: TaskEither<E, A>[]
): TaskEither<E, { lefts: E[]; rights: A[] }> => {
  return async () => {
    const results = await Promise.all(
      taskEithers.map(te => te())
    )

    const lefts: E[] = []
    const rights: A[] = []

    for (const result of results) {
      if (result._tag === 'Left') {
        lefts.push(result.left)
      } else {
        rights.push(result.right)
      }
    }

    if (lefts.length > 0) {
      return left(new Error('Some operations failed'))
    }

    return right({ lefts, rights })
  }
}
```

### 16. retry - Повторные Попытки

```typescript
const retry = <E, A>(
  taskEither: TaskEither<E, A>,
  times: number = 3
): TaskEither<E, A> => {
  return async () => {
    let lastError: E | null = null

    for (let i = 0; i < times; i++) {
      const result = await taskEither()

      if (result._tag === 'Right') {
        return result
      }

      lastError = result.left

      // Задержка перед повторной попыткой (экспоненциальная)
      if (i < times - 1) {
        await new Promise(resolve =>
          setTimeout(resolve, Math.pow(2, i) * 1000)
        )
      }
    }

    return left(lastError!)
  }
}
```

### 17. Обработка Ошибок с Восстановлением

```typescript
const recover = <E, A>(
  taskEither: TaskEither<E, A>,
  recoverFn: (error: E) => TaskEither<E, A>
): TaskEither<E, A> => {
  return async () => {
    const result = await taskEither()

    if (result._tag === 'Left') {
      return recoverFn(result.left)()
    }

    return result
  }
}

// Использование
const fetchDataWithFallback = recover(
  fetchData, // Может вернуть ошибку
  () => fetchCacheData() // Восстановление через кэш
)
```

---

## 💡 Примеры Использования

### Обработка Пользователя

```typescript
const processUser = pipe(
  // Шаг 1: Валидация
  (input: unknown) => UserSchema.safeParse(input),

  // Шаг 2: Преобразование Either в TaskEither
  eitherToTaskEither,

  // Шаг 3: Трансформация данных
  mapTaskEither(transformUser),

  // Шаг 4: Сохранение (цепочка)
  chainTaskEither(saveUser),

  // Шаг 5: Логирование (tap)
  tapTaskEither(user => console.log('User saved:', user.id)),

  // Шаг 6: Возвращаем результат
  mapTaskEither(() => ({ success: true }))
)
```

### Обработка Ошибок

```typescript
const handleError = <E, A>(
  taskEither: TaskEither<E, A>,
  onError: (error: E) => TaskEither<E, A>
): TaskEither<E, A> => {
  return async () => {
    const result = await taskEither()

    if (result._tag === 'Left') {
      const errorResult = await onError(result.left)()
      return errorResult
    }

    return result
  }
}
```

---

## 🚫 Что НЕ Использовать

### ❌ Throw/Catch

```typescript
// ❌ Неправильно
const divideBad = (a: number, b: number): number => {
  if (b === 0) {
    throw new Error('Division by zero')
  }
  return a / b
}

// ✅ Правильно
const divide = (a: number, b: number): Either<Error, number> => {
  if (b === 0) {
    return left(new Error('Division by zero'))
  }
  return right(a / b)
}
```

### ❌ Мутации

```typescript
// ❌ Неправильно
const updateArrayBad = (arr: number[], index: number, value: number): void => {
  arr[index] = value
}

// ✅ Правильно
const updateArray = (arr: number[], index: number, value: number): number[] => {
  return arr.map((item, i) => i === index ? value : item)
}
```

### ❌ Побочные Эффекты в Чистых Функциях

```typescript
// ❌ Неправильно
const saveUserBad = (user: User): User => {
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

// ✅ Правильно
const saveUser = (user: User): TaskEither<Error, User> => {
  return async () => {
    try {
      await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user)
      })
      return right(user)
    } catch (error) {
      return left(error as Error)
    }
  }
}
```

---

**Функциональное программирование - основа надёжной и предсказуемой системы агентов!** ⚡✨
