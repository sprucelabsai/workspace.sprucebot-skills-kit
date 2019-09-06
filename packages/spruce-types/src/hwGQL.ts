import _ from 'lodash'
import * as hwGQL from './generated/hw-gql'
export default _.omit(hwGQL, 'Maybe', 'Scalars')
