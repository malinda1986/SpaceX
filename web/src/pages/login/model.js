import { router, pathMatchRegexp } from 'utils'
import { loginUser } from 'api'

export default {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload }, { put, call, select }) {
      const data = yield call(loginUser, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.success) {
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (!pathMatchRegexp('/login', from)) {
          if (from === '/') router.push('/launches')
          else router.push(from)
        } else {
          router.push('/launches')
        }
      } else {
        throw data
      }
    },
  },
}
