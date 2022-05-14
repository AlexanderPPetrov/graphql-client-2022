import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from 'react-query';
import { fetchData } from '../fetcher/fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Mongo object id scalar type */
  ObjectId: any;
};

export type BaseGameInput = {
  description: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type EditUserInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  games: Array<GameInput>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Game = {
  __typename?: 'Game';
  _id: Scalars['ObjectId'];
  description: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
};

export type GameInput = {
  _id: Scalars['ObjectId'];
  description: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createGame: Game;
  createUser: User;
  deleteGame: Game;
  deleteUser: User;
  editGame: Game;
  editUser: User;
  login: Scalars['String'];
};


export type MutationCreateGameArgs = {
  data: BaseGameInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteGameArgs = {
  _id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  _id: Scalars['String'];
};


export type MutationEditGameArgs = {
  _id: Scalars['String'];
  data: GameInput;
};


export type MutationEditUserArgs = {
  _id: Scalars['String'];
  data: EditUserInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  game: Game;
  games: Array<Game>;
  user: User;
  users: Array<User>;
};


export type QueryGameArgs = {
  _id: Scalars['String'];
};


export type QueryUserArgs = {
  _id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  games: Array<Game>;
  lastLogin: Scalars['Float'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  roles: Array<Scalars['String']>;
};

export type GamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GamesQuery = { __typename?: 'Query', games: Array<{ __typename?: 'Game', _id: any, name: string, description: string, image: string }> };

export type BaseGameFragment = { __typename?: 'Game', image: string, description: string };

export type CreateGameMutationVariables = Exact<{
  data: BaseGameInput;
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame: { __typename?: 'Game', _id: any, image: string, description: string } };

export type DeleteGameMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteGameMutation = { __typename?: 'Mutation', deleteGame: { __typename?: 'Game', _id: any } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', _id: any, firstName: string, lastName: string, email: string, lastLogin: number, roles: Array<string> } };

export const BaseGameFragmentDoc = `
    fragment BaseGame on Game {
  image
  description
}
    `;
export const GamesDocument = `
    query Games {
  games {
    _id
    name
    description
    image
  }
}
    `;
export const useGamesQuery = <
      TData = GamesQuery,
      TError = unknown
    >(
      variables?: GamesQueryVariables,
      options?: UseQueryOptions<GamesQuery, TError, TData>
    ) =>
    useQuery<GamesQuery, TError, TData>(
      variables === undefined ? ['Games'] : ['Games', variables],
      fetchData<GamesQuery, GamesQueryVariables>(GamesDocument, variables),
      options
    );
export const CreateGameDocument = `
    mutation CreateGame($data: BaseGameInput!) {
  createGame(data: $data) {
    _id
    image
    description
    image
  }
}
    `;
export const useCreateGameMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateGameMutation, TError, CreateGameMutationVariables, TContext>) =>
    useMutation<CreateGameMutation, TError, CreateGameMutationVariables, TContext>(
      ['CreateGame'],
      (variables?: CreateGameMutationVariables) => fetchData<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, variables)(),
      options
    );
export const DeleteGameDocument = `
    mutation DeleteGame($id: String!) {
  deleteGame(_id: $id) {
    _id
  }
}
    `;
export const useDeleteGameMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteGameMutation, TError, DeleteGameMutationVariables, TContext>) =>
    useMutation<DeleteGameMutation, TError, DeleteGameMutationVariables, TContext>(
      ['DeleteGame'],
      (variables?: DeleteGameMutationVariables) => fetchData<DeleteGameMutation, DeleteGameMutationVariables>(DeleteGameDocument, variables)(),
      options
    );
export const LoginDocument = `
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['Login'],
      (variables?: LoginMutationVariables) => fetchData<LoginMutation, LoginMutationVariables>(LoginDocument, variables)(),
      options
    );
export const CurrentUserDocument = `
    query CurrentUser {
  currentUser {
    _id
    firstName
    lastName
    email
    lastLogin
    roles
  }
}
    `;
export const useCurrentUserQuery = <
      TData = CurrentUserQuery,
      TError = unknown
    >(
      variables?: CurrentUserQueryVariables,
      options?: UseQueryOptions<CurrentUserQuery, TError, TData>
    ) =>
    useQuery<CurrentUserQuery, TError, TData>(
      variables === undefined ? ['CurrentUser'] : ['CurrentUser', variables],
      fetchData<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, variables),
      options
    );