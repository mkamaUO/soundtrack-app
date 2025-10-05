import { useState, useEffect } from 'react'

interface EEGChannel {
  voltageValue: number
  channelName: string
}

interface EEGData {
  channels: {
    [key: string]: EEGChannel
  }
  timestamp: string
  samplingRate: number
}

interface BiometricRecord {
  id: string
  createdAt: string
  timestamp: string
  sessionId: string
  eegData: EEGData
}

interface BiometricData {
  eegData?: Array<{
    time: string
    alpha: number
    beta: number
    theta: number
    delta: number
  }>
  ecgData?: Array<{
    time: string
    bpm: number
    hrv: number
  }>
  focusData?: Array<{
    time: string
    focus: number
  }>
  happinessData?: Array<{
    time: string
    happiness: number
  }>
  rawBiometricData?: BiometricRecord[]
  channelVoltageData?: Array<{
    time: string
    channel_0: number
    channel_1: number
    channel_2: number
    channel_3: number
  }>
}

export function useBiometricData() {
  const [data, setData] = useState<BiometricData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBiometricData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/biometric')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        console.log('Fetched biometric data:', result)
        
        // Transform the raw API data into chart-friendly format
        const transformedData = transformBiometricData(result)
        setData(transformedData)
      } catch (err) {
        console.error('Error fetching biometric data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch biometric data')
      } finally {
        setLoading(false)
      }
    }

    fetchBiometricData()
  }, [])

  return { data, loading, error }
}

function transformBiometricData(rawData: BiometricRecord[]): BiometricData {
  // Sort data by timestamp to ensure chronological order
  const sortedData = rawData.sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  )

  // Transform EEG channel data for the new chart
  const channelVoltageData = sortedData.map(record => {
    const timestamp = new Date(record.timestamp)
    const timeString = timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
    
    return {
      time: timeString,
      channel_0: record.eegData.channels.channel_0?.voltageValue || 0,
      channel_1: record.eegData.channels.channel_1?.voltageValue || 0,
      channel_2: record.eegData.channels.channel_2?.voltageValue || 0,
      channel_3: record.eegData.channels.channel_3?.voltageValue || 0,
    }
  })

  return {
    rawBiometricData: rawData,
    channelVoltageData: channelVoltageData,
    // Keep the existing mock data structure for other charts
    eegData: undefined,
    ecgData: undefined,
    focusData: undefined,
    happinessData: undefined,
  }
}
