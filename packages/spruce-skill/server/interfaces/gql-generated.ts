/////////////////////////////////////////////////////////
// DO NOT EDIT! THIS FILE IS GENERATED BY "yarn gqlToTS"
/* eslint-disable */
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `JSON` scalar type represents raw JSON as values. */
  SequelizeJSON: any,
  /** A special custom Scalar type for Dates that converts to a ISO formatted string  */
  Date: any,
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any,
};


/** An example item with randomly generated data */
export type IGQLExampleStreamItem = {
  __typename?: 'ExampleStreamItem',
  /** A random message that will be fired every 10 seconds */
  message?: Maybe<Scalars['String']>,
  /** A timestamp for when this message is generated */
  sentAt?: Maybe<Scalars['String']>,
};

/** The requested settings */
export type IGQLGetSettingsResponse = {
  __typename?: 'GetSettingsResponse',
  /** The settings */
  settings?: Maybe<Scalars['JSON']>,
};

/** A group */
export type IGQLGroup = {
  __typename?: 'Group',
  id?: Maybe<Scalars['String']>,
  /** The group name */
  name?: Maybe<Scalars['String']>,
  /** Whether this is a default group. Default groups may not be deleted */
  isDefault?: Maybe<Scalars['Boolean']>,
  createdAt?: Maybe<Scalars['Date']>,
  updatedAt?: Maybe<Scalars['Date']>,
  OrganizationId?: Maybe<Scalars['String']>,
  /** Optionally include warnings for values not authorized in this scope */
  warnings?: Maybe<IGQLWarning>,
  Organization?: Maybe<IGQLOrganization>,
  LocationGroups?: Maybe<IGQLGroupHasManyLocationGroupsConnection>,
  UserGroups?: Maybe<IGQLGroupHasManyUserGroupsConnection>,
  Locations?: Maybe<IGQLGroupBelongsToManyLocationsConnection>,
  Users?: Maybe<IGQLGroupBelongsToManyUsersConnection>,
};


/** A group */
export type IGQLGroupOrganizationArgs = {
  where?: Maybe<Scalars['SequelizeJSON']>
};


/** A group */
export type IGQLGroupLocationGroupsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['String']>,
  where?: Maybe<Scalars['SequelizeJSON']>,
  offset?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>
};


/** A group */
export type IGQLGroupUserGroupsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['String']>,
  where?: Maybe<Scalars['SequelizeJSON']>,
  offset?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>
};


/** A group */
export type IGQLGroupLocationsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['String']>,
  where?: Maybe<Scalars['SequelizeJSON']>,
  offset?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>
};


/** A group */
export type IGQLGroupUsersArgs = {
  limit?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['String']>,
  where?: Maybe<Scalars['SequelizeJSON']>,
  offset?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>
};

/** A connection to a list of items. */
export type IGQLGroupBelongsToManyLocationsConnection = {
  __typename?: 'GroupBelongsToManyLocationsConnection',
  /** Information to aid in pagination. */
  pageInfo: IGQLPageInfo,
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IGQLGroupBelongsToManyLocationsEdge>>>,
  totalCount?: Maybe<Scalars['Int']>,
};

/** An edge in a connection. */
export type IGQLGroupBelongsToManyLocationsEdge = {
  __typename?: 'GroupBelongsToManyLocationsEdge',
  /** The item at the end of the edge */
  node?: Maybe<IGQLLocation>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

/** A connection to a list of items. */
export type IGQLGroupBelongsToManyUsersConnection = {
  __typename?: 'GroupBelongsToManyUsersConnection',
  /** Information to aid in pagination. */
  pageInfo: IGQLPageInfo,
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IGQLGroupBelongsToManyUsersEdge>>>,
  totalCount?: Maybe<Scalars['Int']>,
};

/** An edge in a connection. */
export type IGQLGroupBelongsToManyUsersEdge = {
  __typename?: 'GroupBelongsToManyUsersEdge',
  /** The item at the end of the edge */
  node?: Maybe<IGQLUser>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

/** A connection to a list of items. */
export type IGQLGroupHasManyLocationGroupsConnection = {
  __typename?: 'GroupHasManyLocationGroupsConnection',
  /** Information to aid in pagination. */
  pageInfo: IGQLPageInfo,
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IGQLGroupHasManyLocationGroupsEdge>>>,
  totalCount?: Maybe<Scalars['Int']>,
};

/** An edge in a connection. */
export type IGQLGroupHasManyLocationGroupsEdge = {
  __typename?: 'GroupHasManyLocationGroupsEdge',
  /** The item at the end of the edge */
  node?: Maybe<IGQLLocationGroup>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

/** A connection to a list of items. */
export type IGQLGroupHasManyUserGroupsConnection = {
  __typename?: 'GroupHasManyUserGroupsConnection',
  /** Information to aid in pagination. */
  pageInfo: IGQLPageInfo,
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IGQLGroupHasManyUserGroupsEdge>>>,
  totalCount?: Maybe<Scalars['Int']>,
};

/** An edge in a connection. */
export type IGQLGroupHasManyUserGroupsEdge = {
  __typename?: 'GroupHasManyUserGroupsEdge',
  /** The item at the end of the edge */
  node?: Maybe<IGQLUserGroup>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

/** A job */
export type IGQLJob = {
  __typename?: 'Job',
  id?: Maybe<Scalars['String']>,
  /** Whether this is a default job. Default jobs may not be changed or have their ACLs updated */
  isDefault?: Maybe<Scalars['Boolean']>,
  /** 
 * The base role for this job. Will initially inherit the default values for this
   * role but (if it is not a default Job) may have custom permissions set after
   * creation. Will be one of: "owner", "groupManager", "manager", "teammate", "guest"
 **/
  role?: Maybe<Scalars['String']>,
  /** The Job name. This should be a user-facing friendly name */
  name?: Maybe<Scalars['String']>,
  /** Custom ACL list of permissions. This will be ignored if isDefault=true. */
  acl?: Maybe<Scalars['SequelizeJSON']>,
  /** Custom ACL list of permission overrides requiring a user to be online. This will be ignored if isDefault=true. */
  inStoreAcl?: Maybe<Scalars['SequelizeJSON']>,
  createdAt?: Maybe<Scalars['Date']>,
  updatedAt?: Maybe<Scalars['Date']>,
  OrganizationId?: Maybe<Scalars['String']>,
  /** Optionally include warnings for values not authorized in this scope */
  warnings?: Maybe<IGQLWarning>,
  Organization?: Maybe<IGQLOrganization>,
  UserLocations?: Maybe<IGQLJobHasManyUserLocationsConnection>,
  UserGroups?: Maybe<IGQLJobHasManyUserGroupsConnection>,
};


/** A job */
export type IGQLJobOrganizationArgs = {
  where?: Maybe<Scalars['SequelizeJSON']>
};


/** A job */
export type IGQLJobUserLocationsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['String']>,
  where?: Maybe<Scalars['SequelizeJSON']>,
  offset?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>
};


/** A job */
export type IGQLJobUserGroupsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['String']>,
  where?: Maybe<Scalars['SequelizeJSON']>,
  offset?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>
};

/** A connection to a list of items. */
export type IGQLJobHasManyUserGroupsConnection = {
  __typename?: 'JobHasManyUserGroupsConnection',
  /** Information to aid in pagination. */
  pageInfo: IGQLPageInfo,
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IGQLJobHasManyUserGroupsEdge>>>,
  totalCount?: Maybe<Scalars['Int']>,
};

/** An edge in a connection. */
export type IGQLJobHasManyUserGroupsEdge = {
  __typename?: 'JobHasManyUserGroupsEdge',
  /** The item at the end of the edge */
  node?: Maybe<IGQLUserGroup>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

/** A connection to a list of items. */
export type IGQLJobHasManyUserLocationsConnection = {
  __typename?: 'JobHasManyUserLocationsConnection',
  /** Information to aid in pagination. */
  pageInfo: IGQLPageInfo,
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IGQLJobHasManyUserLocationsEdge>>>,
  totalCount?: Maybe<Scalars['Int']>,
};

/** An edge in a connection. */
export type IGQLJobHasManyUserLocationsEdge = {
  __typename?: 'JobHasManyUserLocationsEdge',
  /** The item at the end of the edge */
  node?: Maybe<IGQLUserLocation>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};


/** A location */
export type IGQLLocation = {
  __typename?: 'Location',
  id?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  addressLine1?: Maybe<Scalars['String']>,
  addressLine2?: Maybe<Scalars['String']>,
  addressCity?: Maybe<Scalars['String']>,
  addressState?: Maybe<Scalars['String']>,
  addressZip?: Maybe<Scalars['String']>,
  addressCountry?: Maybe<Scalars['String']>,
  timezone?: Maybe<Scalars['String']>,
  isPublic?: Maybe<Scalars['String']>,
  storeNum?: Maybe<Scalars['String']>,
  createdAt?: Maybe<Scalars['Date']>,
  updatedAt?: Maybe<Scalars['Date']>,
  OrganizationId?: Maybe<Scalars['String']>,
  /** Optionally include warnings for values not authorized in this scope */
  warnings?: Maybe<IGQLWarning>,
  Organization?: Maybe<IGQLOrganization>,
  UserLocations?: Maybe<IGQLLocationHasManyUserLocationsConnection>,
  Users?: Maybe<IGQLLocationBelongsToManyUsersConnection>,
  geo?: Maybe<Scalars['JSON']>,
};


/** A location */
export type IGQLLocationOrganizationArgs = {
  where?: Maybe<Scalars['SequelizeJSON']>
};


/** A location */
export type IGQLLocationUserLocationsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['String']>,
  where?: Maybe<Scalars['SequelizeJSON']>,
  offset?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>
};


/** A location */
export type IGQLLocationUsersArgs = {
  limit?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['String']>,
  where?: Maybe<Scalars['SequelizeJSON']>,
  offset?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  orderBy?: Maybe<Array<Maybe<IGQLLocationBelongsToManyUsersOrderBy>>>
};

/** A connection to a list of items. */
export type IGQLLocationBelongsToManyUsersConnection = {
  __typename?: 'LocationBelongsToManyUsersConnection',
  /** Information to aid in pagination. */
  pageInfo: IGQLPageInfo,
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IGQLLocationBelongsToManyUsersEdge>>>,
  totalCount?: Maybe<Scalars['Int']>,
  customConnectionField?: Maybe<Scalars['String']>,
};

/** An edge in a connection. */
export type IGQLLocationBelongsToManyUsersEdge = {
  __typename?: 'LocationBelongsToManyUsersEdge',
  /** The item at the end of the edge */
  node?: Maybe<IGQLUser>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
  customEdgeField?: Maybe<Scalars['String']>,
};

export enum IGQLLocationBelongsToManyUsersOrderBy {
  FirstName = 'FIRST_NAME',
  LastName = 'LAST_NAME'
}

/** A connection to a list of items. */
export type IGQLLocationConnection = {
  __typename?: 'LocationConnection',
  /** Information to aid in pagination. */
  pageInfo: IGQLPageInfo,
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IGQLLocationEdge>>>,
  totalCount?: Maybe<Scalars['Int']>,
};

/** An edge in a connection. */
export type IGQLLocationEdge = {
  __typename?: 'LocationEdge',
  /** The item at the end of the edge */
  node?: Maybe<IGQLLocation>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

/** A location group */
export type IGQLLocationGroup = {
  __typename?: 'LocationGroup',
  id?: Maybe<Scalars['String']>,
  createdAt?: Maybe<Scalars['Date']>,
  updatedAt?: Maybe<Scalars['Date']>,
  GroupId?: Maybe<Scalars['String']>,
  LocationId?: Maybe<Scalars['String']>,
  /** Optionally include warnings for values not authorized in this scope */
  warnings?: Maybe<IGQLWarning>,
  Location?: Maybe<IGQLLocation>,
  Group?: Maybe<IGQLGroup>,
};


/** A location group */
export type IGQLLocationGroupLocationArgs = {
  where?: Maybe<Scalars['SequelizeJSON']>
};


/** A location group */
export type IGQLLocationGroupGroupArgs = {
  where?: Maybe<Scalars['SequelizeJSON']>
};

/** A connection to a list of items. */
export type IGQLLocationHasManyUserLocationsConnection = {
  __typename?: 'LocationHasManyUserLocationsConnection',
  /** Information to aid in pagination. */
  pageInfo: IGQLPageInfo,
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IGQLLocationHasManyUserLocationsEdge>>>,
  totalCount?: Maybe<Scalars['Int']>,
};

/** An edge in a connection. */
export type IGQLLocationHasManyUserLocationsEdge = {
  __typename?: 'LocationHasManyUserLocationsEdge',
  /** The item at the end of the edge */
  node?: Maybe<IGQLUserLocation>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

/** An organization */
export type IGQLOrganization = {
  __typename?: 'Organization',
  id?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  createdAt?: Maybe<Scalars['Date']>,
  updatedAt?: Maybe<Scalars['Date']>,
  /** Optionally include warnings for values not authorized in this scope */
  warnings?: Maybe<IGQLWarning>,
  Locations?: Maybe<IGQLOrganizationHasManyLocationsConnection>,
};


/** An organization */
export type IGQLOrganizationLocationsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['String']>,
  where?: Maybe<Scalars['SequelizeJSON']>,
  offset?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>
};

/** A connection to a list of items. */
export type IGQLOrganizationHasManyLocationsConnection = {
  __typename?: 'OrganizationHasManyLocationsConnection',
  /** Information to aid in pagination. */
  pageInfo: IGQLPageInfo,
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IGQLOrganizationHasManyLocationsEdge>>>,
  totalCount?: Maybe<Scalars['Int']>,
};

/** An edge in a connection. */
export type IGQLOrganizationHasManyLocationsEdge = {
  __typename?: 'OrganizationHasManyLocationsEdge',
  /** The item at the end of the edge */
  node?: Maybe<IGQLLocation>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

/** Information about pagination in a connection. */
export type IGQLPageInfo = {
  __typename?: 'PageInfo',
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'],
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'],
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>,
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>,
};

export type IGQLQuery = {
  __typename?: 'Query',
  /** Get public information about locations. Max/default limit 50. */
  Locations?: Maybe<IGQLLocationConnection>,
  /** Gets information about a single organization. Depending on user permissions, additional information may be available. */
  Organization?: Maybe<IGQLOrganization>,
  /** Get settings */
  Settings?: Maybe<IGQLGetSettingsResponse>,
  /** Get public information about users. Max/default limit 50. */
  Users?: Maybe<IGQLUserConnection>,
  UserLocations?: Maybe<IGQLUserLocationConnection>,
};


export type IGQLQueryLocationsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['String']>,
  where?: Maybe<Scalars['SequelizeJSON']>,
  offset?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  organizationId?: Maybe<Scalars['String']>
};


export type IGQLQueryOrganizationArgs = {
  id: Scalars['String']
};


export type IGQLQuerySettingsArgs = {
  requestedSettings?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type IGQLQueryUsersArgs = {
  limit?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['String']>,
  where?: Maybe<Scalars['SequelizeJSON']>,
  offset?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  organizationId?: Maybe<Scalars['String']>,
  locationId?: Maybe<Scalars['String']>
};


export type IGQLQueryUserLocationsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['String']>,
  where?: Maybe<Scalars['SequelizeJSON']>,
  offset?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  organizationId?: Maybe<Scalars['String']>,
  locationId?: Maybe<Scalars['String']>
};

/** The scope warnings for a query */
export type IGQLScopeWarning = {
  __typename?: 'ScopeWarning',
  /** The field not allowed in this query using the requested scope */
  field?: Maybe<Scalars['String']>,
};


export type IGQLSubscription = {
  __typename?: 'Subscription',
  /** An example of creating a stream of data from an external graphql server */
  ExampleStream?: Maybe<IGQLExampleStreamItem>,
};

/** A user */
export type IGQLUser = {
  __typename?: 'User',
  id?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  profileImageUUID?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  nameWithLastInitial?: Maybe<Scalars['String']>,
  casualName?: Maybe<Scalars['String']>,
  profileImages?: Maybe<Scalars['SequelizeJSON']>,
  defaultProfileImages?: Maybe<Scalars['SequelizeJSON']>,
  createdAt?: Maybe<Scalars['Date']>,
  updatedAt?: Maybe<Scalars['Date']>,
  /** Optionally include warnings for values not authorized in this scope */
  warnings?: Maybe<IGQLWarning>,
  Locations?: Maybe<IGQLUserBelongsToManyLocationsConnection>,
  UserLocations?: Maybe<IGQLUserHasManyUserLocationsConnection>,
  Organizations?: Maybe<IGQLUserBelongsToManyOrganizationsConnection>,
  UserOrganizations?: Maybe<IGQLUserHasManyUserOrganizationsConnection>,
  Groups?: Maybe<IGQLUserBelongsToManyGroupsConnection>,
  UserGroups?: Maybe<IGQLUserHasManyUserGroupsConnection>,
};


/** A user */
export type IGQLUserLocationsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['String']>,
  where?: Maybe<Scalars['SequelizeJSON']>,
  offset?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>
};


/** A user */
export type IGQLUserUserLocationsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['String']>,
  where?: Maybe<Scalars['SequelizeJSON']>,
  offset?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>
};


/** A user */
export type IGQLUserOrganizationsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['String']>,
  where?: Maybe<Scalars['SequelizeJSON']>,
  offset?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>
};


/** A user */
export type IGQLUserUserOrganizationsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['String']>,
  where?: Maybe<Scalars['SequelizeJSON']>,
  offset?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>
};


/** A user */
export type IGQLUserGroupsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['String']>,
  where?: Maybe<Scalars['SequelizeJSON']>,
  offset?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>
};


/** A user */
export type IGQLUserUserGroupsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['String']>,
  where?: Maybe<Scalars['SequelizeJSON']>,
  offset?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>
};

/** A connection to a list of items. */
export type IGQLUserBelongsToManyGroupsConnection = {
  __typename?: 'UserBelongsToManyGroupsConnection',
  /** Information to aid in pagination. */
  pageInfo: IGQLPageInfo,
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IGQLUserBelongsToManyGroupsEdge>>>,
  totalCount?: Maybe<Scalars['Int']>,
};

/** An edge in a connection. */
export type IGQLUserBelongsToManyGroupsEdge = {
  __typename?: 'UserBelongsToManyGroupsEdge',
  /** The item at the end of the edge */
  node?: Maybe<IGQLGroup>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

/** A connection to a list of items. */
export type IGQLUserBelongsToManyLocationsConnection = {
  __typename?: 'UserBelongsToManyLocationsConnection',
  /** Information to aid in pagination. */
  pageInfo: IGQLPageInfo,
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IGQLUserBelongsToManyLocationsEdge>>>,
  totalCount?: Maybe<Scalars['Int']>,
};

/** An edge in a connection. */
export type IGQLUserBelongsToManyLocationsEdge = {
  __typename?: 'UserBelongsToManyLocationsEdge',
  /** The item at the end of the edge */
  node?: Maybe<IGQLLocation>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

/** A connection to a list of items. */
export type IGQLUserBelongsToManyOrganizationsConnection = {
  __typename?: 'UserBelongsToManyOrganizationsConnection',
  /** Information to aid in pagination. */
  pageInfo: IGQLPageInfo,
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IGQLUserBelongsToManyOrganizationsEdge>>>,
  totalCount?: Maybe<Scalars['Int']>,
};

/** An edge in a connection. */
export type IGQLUserBelongsToManyOrganizationsEdge = {
  __typename?: 'UserBelongsToManyOrganizationsEdge',
  /** The item at the end of the edge */
  node?: Maybe<IGQLOrganization>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

/** A connection to a list of items. */
export type IGQLUserConnection = {
  __typename?: 'UserConnection',
  /** Information to aid in pagination. */
  pageInfo: IGQLPageInfo,
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IGQLUserEdge>>>,
  totalCount?: Maybe<Scalars['Int']>,
};

/** An edge in a connection. */
export type IGQLUserEdge = {
  __typename?: 'UserEdge',
  /** The item at the end of the edge */
  node?: Maybe<IGQLUser>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

/** A user group */
export type IGQLUserGroup = {
  __typename?: 'UserGroup',
  id?: Maybe<Scalars['String']>,
  createdAt?: Maybe<Scalars['Date']>,
  updatedAt?: Maybe<Scalars['Date']>,
  GroupId?: Maybe<Scalars['String']>,
  UserId?: Maybe<Scalars['String']>,
  JobId?: Maybe<Scalars['String']>,
  OrganizationId?: Maybe<Scalars['String']>,
  /** Optionally include warnings for values not authorized in this scope */
  warnings?: Maybe<IGQLWarning>,
  User?: Maybe<IGQLUser>,
  Group?: Maybe<IGQLGroup>,
  Job?: Maybe<IGQLJob>,
  Organization?: Maybe<IGQLOrganization>,
};


/** A user group */
export type IGQLUserGroupUserArgs = {
  where?: Maybe<Scalars['SequelizeJSON']>
};


/** A user group */
export type IGQLUserGroupGroupArgs = {
  where?: Maybe<Scalars['SequelizeJSON']>
};


/** A user group */
export type IGQLUserGroupJobArgs = {
  where?: Maybe<Scalars['SequelizeJSON']>
};


/** A user group */
export type IGQLUserGroupOrganizationArgs = {
  where?: Maybe<Scalars['SequelizeJSON']>
};

/** A connection to a list of items. */
export type IGQLUserHasManyUserGroupsConnection = {
  __typename?: 'UserHasManyUserGroupsConnection',
  /** Information to aid in pagination. */
  pageInfo: IGQLPageInfo,
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IGQLUserHasManyUserGroupsEdge>>>,
  totalCount?: Maybe<Scalars['Int']>,
};

/** An edge in a connection. */
export type IGQLUserHasManyUserGroupsEdge = {
  __typename?: 'UserHasManyUserGroupsEdge',
  /** The item at the end of the edge */
  node?: Maybe<IGQLUserGroup>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

/** A connection to a list of items. */
export type IGQLUserHasManyUserLocationsConnection = {
  __typename?: 'UserHasManyUserLocationsConnection',
  /** Information to aid in pagination. */
  pageInfo: IGQLPageInfo,
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IGQLUserHasManyUserLocationsEdge>>>,
  totalCount?: Maybe<Scalars['Int']>,
};

/** An edge in a connection. */
export type IGQLUserHasManyUserLocationsEdge = {
  __typename?: 'UserHasManyUserLocationsEdge',
  /** The item at the end of the edge */
  node?: Maybe<IGQLUserLocation>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

/** A connection to a list of items. */
export type IGQLUserHasManyUserOrganizationsConnection = {
  __typename?: 'UserHasManyUserOrganizationsConnection',
  /** Information to aid in pagination. */
  pageInfo: IGQLPageInfo,
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IGQLUserHasManyUserOrganizationsEdge>>>,
  totalCount?: Maybe<Scalars['Int']>,
};

/** An edge in a connection. */
export type IGQLUserHasManyUserOrganizationsEdge = {
  __typename?: 'UserHasManyUserOrganizationsEdge',
  /** The item at the end of the edge */
  node?: Maybe<IGQLUserOrganization>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

/** A user location */
export type IGQLUserLocation = {
  __typename?: 'UserLocation',
  id?: Maybe<Scalars['String']>,
  role?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  visits?: Maybe<Scalars['Int']>,
  lastRecordedVisit?: Maybe<Scalars['Date']>,
  createdAt?: Maybe<Scalars['Date']>,
  updatedAt?: Maybe<Scalars['Date']>,
  JobId?: Maybe<Scalars['String']>,
  LocationId?: Maybe<Scalars['String']>,
  UserId?: Maybe<Scalars['String']>,
  /** Optionally include warnings for values not authorized in this scope */
  warnings?: Maybe<IGQLWarning>,
  User?: Maybe<IGQLUser>,
  Location?: Maybe<IGQLLocation>,
  Job?: Maybe<IGQLJob>,
};


/** A user location */
export type IGQLUserLocationUserArgs = {
  where?: Maybe<Scalars['SequelizeJSON']>
};


/** A user location */
export type IGQLUserLocationLocationArgs = {
  where?: Maybe<Scalars['SequelizeJSON']>
};


/** A user location */
export type IGQLUserLocationJobArgs = {
  where?: Maybe<Scalars['SequelizeJSON']>
};

/** A connection to a list of items. */
export type IGQLUserLocationConnection = {
  __typename?: 'UserLocationConnection',
  /** Information to aid in pagination. */
  pageInfo: IGQLPageInfo,
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IGQLUserLocationEdge>>>,
  totalCount?: Maybe<Scalars['Int']>,
};

/** An edge in a connection. */
export type IGQLUserLocationEdge = {
  __typename?: 'UserLocationEdge',
  /** The item at the end of the edge */
  node?: Maybe<IGQLUserLocation>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

/** A user organization */
export type IGQLUserOrganization = {
  __typename?: 'UserOrganization',
  id?: Maybe<Scalars['String']>,
  role?: Maybe<Scalars['String']>,
  createdAt?: Maybe<Scalars['Date']>,
  updatedAt?: Maybe<Scalars['Date']>,
  UserId?: Maybe<Scalars['String']>,
  OrganizationId?: Maybe<Scalars['String']>,
  /** Optionally include warnings for values not authorized in this scope */
  warnings?: Maybe<IGQLWarning>,
  User?: Maybe<IGQLUser>,
  Organization?: Maybe<IGQLOrganization>,
};


/** A user organization */
export type IGQLUserOrganizationUserArgs = {
  where?: Maybe<Scalars['SequelizeJSON']>
};


/** A user organization */
export type IGQLUserOrganizationOrganizationArgs = {
  where?: Maybe<Scalars['SequelizeJSON']>
};

/** The scope warnings for a query */
export type IGQLWarning = {
  __typename?: 'Warning',
  /** The list of scope warning on a query */
  scopes?: Maybe<Array<Maybe<IGQLScopeWarning>>>,
};
