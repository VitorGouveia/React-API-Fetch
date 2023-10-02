import { Store } from '@/components/store'

export default function Home() {
  return (
    <Store
      name="Serasa"
      store="App Serasa"
      icon="/serasa.png"
      downloads='150 mil'
      reviews='5k'
      size='15 MB'
      stars={4.9}
    />
  )
}
