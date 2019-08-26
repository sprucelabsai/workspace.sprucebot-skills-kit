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
	FileItem: typeof FileItem
	Group: typeof Group
	Job: typeof Job
	Location: typeof Location
	LocationGroup: typeof LocationGroup
	Organization: typeof Organization
	ScopeWarning: typeof ScopeWarning
	Skill: typeof Skill
	User: typeof User
	UserGroup: typeof UserGroup
	UserLocation: typeof UserLocation
	UserOrganization: typeof UserOrganization
	Warning: typeof Warning
}
