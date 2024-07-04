"use client"
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { User } from '@supabase/supabase-js'

export default   function PrivatePage() {
  const supabase = createClient()
    const [user,setUser] = useState<User>()

    const getUser = async()=>{

        const { data, error } =await  supabase.auth.getUser()
        if (error || !data?.user) {
          redirect('/login')
        }
        setUser(data.user)
    }

    getUser()

  return <p>Hello {user?.email}</p>
}