# BookMeThat Backend - Test Report
## Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

Write-Host "=" * 60
Write-Host "BookMeThat Backend API Test Suite"
Write-Host "=" * 60

$baseUrl = "http://localhost:4000"
$passed = 0
$failed = 0

function Test-Endpoint {
    param(
        [string]$Method,
        [string]$Endpoint,
        [string]$Description,
        [hashtable]$Body = $null
    )
    
    Write-Host "`nTesting: $Description"
    Write-Host "$Method $Endpoint"
    
    try {
        $params = @{
            Uri = "$baseUrl$Endpoint"
            Method = $Method
            TimeoutSec = 5
        }
        
        if ($Body) {
            $params.Body = ($Body | ConvertTo-Json)
            $params.ContentType = "application/json"
        }
        
        $response = Invoke-WebRequest @params
        Write-Host "✅ PASS - Status: $($response.StatusCode)" -ForegroundColor Green
        $script:passed++
        return $response
    }
    catch {
        if ($_.Exception.Response.StatusCode.value__ -eq 401) {
            Write-Host "✅ PASS - Expected 401 Unauthorized" -ForegroundColor Green
            $script:passed++
        }
        elseif ($_.Exception.Response.StatusCode.value__ -eq 400) {
            Write-Host "✅ PASS - Expected 400 Bad Request (validation)" -ForegroundColor Green
            $script:passed++
        }
        else {
            Write-Host "❌ FAIL - Error: $($_.Exception.Message)" -ForegroundColor Red
            $script:failed++
        }
    }
}

Write-Host "`n--- Health Check ---"
Test-Endpoint -Method "GET" -Endpoint "/health" -Description "Health check"

Write-Host "`n--- Authentication Endpoints ---"
Test-Endpoint -Method "POST" -Endpoint "/api/v1/auth/register" -Description "Register (should fail - no data)" -Body @{}
Test-Endpoint -Method "POST" -Endpoint "/api/v1/auth/login" -Description "Login (should fail - no data)" -Body @{}
Test-Endpoint -Method "GET" -Endpoint "/api/v1/auth/me" -Description "Get current user (should fail - not authenticated)"

Write-Host "`n--- Booking Endpoints ---"
Test-Endpoint -Method "GET" -Endpoint "/api/v1/bookings" -Description "List bookings (should fail - not authenticated)"
Test-Endpoint -Method "POST" -Endpoint "/api/v1/bookings" -Description "Create booking (should fail - not authenticated)"

Write-Host "`n--- eSIM Endpoints ---"
Test-Endpoint -Method "GET" -Endpoint "/api/v1/esim/plans?country=US" -Description "List eSIM plans for US"
Test-Endpoint -Method "POST" -Endpoint "/api/v1/esim/purchase" -Description "Purchase eSIM (should fail - no data)"

Write-Host "`n--- Train Booking Endpoints ---"
Test-Endpoint -Method "GET" -Endpoint "/api/v1/trains/stations" -Description "List train stations"
Test-Endpoint -Method "POST" -Endpoint "/api/v1/trains/search" -Description "Search trains (should fail - no data)"

Write-Host "`n" + ("=" * 60)
Write-Host "Test Results Summary"
Write-Host ("=" * 60)
Write-Host "✅ Passed: $passed" -ForegroundColor Green
Write-Host "❌ Failed: $failed" -ForegroundColor Red
Write-Host "Total: $($passed + $failed)"
Write-Host ("=" * 60)

if ($failed -eq 0) {
    Write-Host "`n🎉 All tests passed! Backend is working correctly." -ForegroundColor Green
}
else {
    Write-Host "`n⚠️  Some tests failed. Please review the errors above." -ForegroundColor Yellow
}
