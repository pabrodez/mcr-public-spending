import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis,
    PolarRadiusAxis, Tooltip, ResponsiveContainer
} from 'recharts'

export function AreaSpendRadarChart({ dataset }) {

    return (
        <div style={{ width: '80vw', height: '40vh' }}>
            <ResponsiveContainer width="100%" height="100%" >
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataset} >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis scale="linear" domain={[0, 'dataMax + 1000']} />
                    <Radar dataKey="value" fillOpacity={0.6} />
                    <Tooltip />
                </RadarChart>
            </ResponsiveContainer>
        </div >
    )
}

