package main

import (
	"math"
	"time"

	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/mem"
)

type SystemStats struct {
	CPUUsage float64 `json:"cpu_usage"`
	RAMUsage float64 `json:"ram_usage"`
	RAMTotal uint64  `json:"ram_total"`
	RAMFree  uint64  `json:"ram_free"`
}

func GetSystemStats() (SystemStats, error) {
	// CPU Usage (over 1 second roughly, but we want instant for streaming so we might use 0 with persistent tracker or just cached)
	// For simplicity in SSE, we can just grab the latest.
	percent, err := cpu.Percent(0, false)
	if err != nil {
		return SystemStats{}, err
	}

	v, err := mem.VirtualMemory()
	if err != nil {
		return SystemStats{}, err
	}

	return SystemStats{
		CPUUsage: math.Round(percent[0]*10) / 10, // Round to 1 decimal
		RAMUsage: math.Round(v.UsedPercent*10) / 10,
		RAMTotal: v.Total,
		RAMFree:  v.Free,
	}, nil
}

func StreamStats(stream chan SystemStats) {
	ticker := time.NewTicker(2 * time.Second)
	defer ticker.Stop()

	for range ticker.C {
		stats, err := GetSystemStats()
		if err == nil {
			stream <- stats
		}
	}
}
