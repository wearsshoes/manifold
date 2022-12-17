import { db } from './db'
import { run } from 'common/supabase/utils'
import { User } from 'common/user'

export type SearchUserInfo = Pick<
  User,
  'id' | 'name' | 'username' | 'avatarUrl'
>

export async function searchUsers(prompt: string) {
  const { data } = await run(
    db
      .from('users')
      .select('id, data->name, data->username, data->avatarUrl')
      .or(`data->>username.ilike.%${prompt}%,data->>name.ilike.%${prompt}%`)
      .order('data->name')
  )
  return data as SearchUserInfo[]
}
