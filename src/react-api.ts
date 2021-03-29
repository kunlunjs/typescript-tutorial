import { inspect } from 'util'
import React from 'react'
// import Reconciler from 'react-reconciler'

console.log(Reflect.ownKeys(React))
/**
 * [
    'Children',
    'Component',
    'Fragment',
    'Profiler',
    'PureComponent',
    'StrictMode',
    'Suspense',
    '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED',
    'cloneElement',
    'createContext',
    'createElement',
    'createFactory',
    'createRef',
    'forwardRef',
    'isValidElement',
    'lazy',
    'memo',
    'useCallback',
    'useContext',
    'useDebugValue',
    'useEffect',
    'useImperativeHandle',
    'useLayoutEffect',
    'useMemo',
    'useReducer',
    'useRef',
    'useState',
    'version'
  ]
 */
console.log(
  inspect(React, {
    showHidden: true,
    depth: Infinity,
    colors: true
  })
)
