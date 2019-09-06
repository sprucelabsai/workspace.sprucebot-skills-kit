import _ from 'lodash'
import * as apiGQL from './generated/api-gql'
export default _.omit(apiGQL, 'Maybe', 'Scalars')
