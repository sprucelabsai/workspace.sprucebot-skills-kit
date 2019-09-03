import FileItem from '../gql/types/FileItem'
import Group from '../gql/types/Group'
import Job from '../gql/types/Job'
import Location from '../gql/types/Location'
import LocationGroup from '../gql/types/LocationGroup'
import Organization from '../gql/types/Organization'
import ScopeWarning from '../gql/types/ScopeWarning'
import Skill from '../gql/types/Skill'
import User from '../gql/types/User'
import UserGroup from '../gql/types/UserGroup'
import UserLocation from '../gql/types/UserLocation'
import UserOrganization from '../gql/types/UserOrganization'
import Warning from '../gql/types/Warning'

/**
 * Defines base GQL types for Spruce models and helper types
 */

export interface ISpruceGQLTypes {
	FileItem: ReturnType<typeof FileItem>
	Group: ReturnType<typeof Group>
	Job: ReturnType<typeof Job>
	Location: ReturnType<typeof Location>
	LocationGroup: ReturnType<typeof LocationGroup>
	Organization: ReturnType<typeof Organization>
	ScopeWarning: ReturnType<typeof ScopeWarning>
	Skill: ReturnType<typeof Skill>
	User: ReturnType<typeof User>
	UserGroup: ReturnType<typeof UserGroup>
	UserLocation: ReturnType<typeof UserLocation>
	UserOrganization: ReturnType<typeof UserOrganization>
	Warning: ReturnType<typeof Warning>
}
