import { PricingTable } from '@clerk/nextjs'

export default function Pricing() {
  return (

    <div className="mt-20">
<h2 className="text-3xl font-bold text-center my-5">One Plan. Everything You Need.</h2>
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '0 1rem' }}>
      <PricingTable />
    </div>
    </div>
  )
}