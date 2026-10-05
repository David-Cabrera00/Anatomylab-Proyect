$lines = Get-Content src\App.tsx
$clean = @()
$foundExport = $false
foreach ($line in $lines) {
    if ($line.Trim() -eq "export default App;") {
        if (-not $foundExport) {
            $foundExport = $true
        } else {
            continue
        }
    }
    $clean += $line
}
if ($clean[-1].Trim() -ne "export default App;") {
    $clean += "export default App;"
}
$clean | Out-File -Encoding utf8 src\App.tsx