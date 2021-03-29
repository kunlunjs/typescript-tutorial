/**
 * tsconfig.json 选项
 *   esModuleInterop
 *   allowSyntheticDefaultImports
 * Function Components
 * Hooks
 *   supported in 16.8 up
 *   useState
 *   useEffect
 *   useCallback
 *   useMemo
 *   useRef
 *   useImperativeHandle
 * Class Components
 * Typing DefaultProps
 * Types or Interfaces
 * getDrivedStateFromProps
 * Forms and Events
 * Context
 * forwardRef/createRef
 * Portals
 * Error Boundaries
 */
import React, {
  useState,
  useRef,
  useDebugValue,
  useCallback,
  useContext,
  useMemo,
  useEffect,
  useLayoutEffect,
  useImperativeHandle
} from 'react'

/**
 * 1. Function Components
 */
type App1Props = { message: string }
const App1 = ({ message }: App1Props) => <div>{message}</div>
const App2: React.FunctionComponent<{ message: string }> = ({ message }) => (
  <div>{message}</div>
)
// shorthand
const App3: React.FC<{ message: string }> = ({ message }) => (
  <div>{message}</div>
)
const App4: React.FC<{ message: string }> = ({ message, children }) => (
  <div>
    <div>{message}</div>
    <div>{children}</div>
  </div>
)

/**
 * Conditional rendering
 *   错误示范
 *   函数式组件只能返回 jsx 或 null
 *   类型断言
 */
// JSX 元素类型“false | Element”不是 JSX 元素的构造函数。
const MyConditionalComponent = ({ shouldRender = false }) =>
  shouldRender ? <div /> : null
const el = <MyConditionalComponent />
// ❌ JSX 元素类型“any[]”不是 JSX 元素的构造函数。
// const MyArrayComponent = () => <>{Array(5).fill(<div />)}</>
const MyArrayComponent = () => (Array(5).fill(<div />) as any) as JSX.Element
const el2 = <MyArrayComponent />

/**
 * 2. Hooks
 */
const App5 = () => {
  const [state, setState] = useState<boolean>(false)
  // HTMLElement HTMLDivElement HTMLInputElement
  const divRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    setTimeout(() => {
      //TODO
    }, 1000)
  })

  const onButtonClick = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div>
      <input ref={inputRef} type='text' />
      <div ref={divRef}>123</div>
      <button onClick={onButtonClick}>点我</button>
    </div>
  )
}
/**
 * Custom Hooks
 */
function useLoading() {
  const [isLoading, setState] = useState(false)
  const load = (promise: Promise<any>) => {
    setState(true)
    return promise.finally(() => setState(false))
  }
  // return [isLoading, load] as const
  return [isLoading, load] as [boolean, (promise: Promise<any>) => Promise<any>]
}
// TODO Alternative: Asserting a tuple return type

/**
 * 3. Class Components
 */
type MyProps = {
  message: string
}
type MyState = {
  count: number
  text: string
}
class App extends React.Component<MyProps, MyState> {
  // without assignment
  pointer: number
  // Why annotate `state` twice?
  state: MyState = {
    count: 0,
    text: ''
  }

  componentDidMount() {
    this.pointer = 3
  }

  increment = (amt: number) => {
    this.setState(state => ({
      count: state.count + amt
    }))
  }

  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ text: e.currentTarget.value })
  }
  render() {
    return (
      <div onClick={() => this.increment(1)}>
        {this.props.message} {this.state.count}
        <input type='text' onChange={this.onChange} />
      </div>
    )
  }
}

/**
 * 4. Typing DefaultProps
 *   不需要 React.FC
 */
type Props = { age: number } & typeof defaultProps
const defaultProps = {
  who: 'Jordan'
}
const App6 = (props: Props) => {
  //TODO
}
App6.defaultProps = defaultProps

type App7Props = typeof App7.defaultProps & {
  age: number
}
type App7State = {}
class App7 extends React.Component<App7Props, App7State> {
  static defaultProps = {
    name: 'Michael'
  }
  static getDerivedStateFromProps(
    props: App7Props,
    state: App7State
  ): Partial<App7State> | null {
    return null
  }
  render() {
    return <div></div>
  }
}
const app7 = <App7 age={18} />

/**
 * 5. Types or Interfaces
 */

/**
 * 6. getDrivedStateFromProps
 */

/**
 * 7. Forms and Events
 */

/**
 * 8. Context
 */

/**
 * 9. forwardRef/createRef
 */

/**
 * 10. Portals
 */

/**
 * 11. Error Boundaries
 */

export declare interface AppProps {
  // children: JSX.Element
  // children: JSX.Element | JSX.Element[]
  // children: React.ReactChildren
  children: React.ReactChild[] // better
  functionChildren: (name: string) => React.ReactNode
  style?: React.CSSProperties
  onChange?: React.FormEventHandler<HTMLInputElement>
  props: Props & React.PropsWithoutRef<JSX.IntrinsicElements['button']>
}
// JSX.Element -> Return value of React.createElement
// React.createElement always returns an object
// React.ReactNode -> Return value of a component
