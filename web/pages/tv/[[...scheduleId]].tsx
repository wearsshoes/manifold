import { getContracts } from 'web/lib/supabase/contracts'
import { db } from 'web/lib/supabase/db'
import { TVPage } from 'web/components/tv/tv-page'
import { ScheduleItem, filterSchedule } from 'web/components/tv/tv-schedule'

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' }
}

export async function getStaticProps(props: {
  params: { scheduleId: string[] }
}) {
  const scheduleId = props.params.scheduleId?.[0] ?? null

  const { data } = await db.from('tv_schedule').select('*')

  const schedule = filterSchedule(data as ScheduleItem[] | null, scheduleId)

  const contractIds = schedule.map((s) => s.contract_id)
  const contracts = await getContracts(contractIds)

  return {
    props: {
      contracts,
      schedule,
      scheduleId,
    },
    revalidate: 60,
  }
}

export default TVPage
