#!/bin/bash
# Run this with your Vercel token:
# VERCEL_TOKEN="your_token_here" bash deploy_command.sh

TOKEN="${VERCEL_TOKEN}"
TEAM_ID="aileadx10-5415s-projects"
PROJECT_ID="prj_0ONYR2JvxAEbgNGZZTSLzeAi22VT"

echo "🚀 Deploying to Vercel..."

curl -s -X POST "https://api.vercel.com/v13/deployments?teamId=${TEAM_ID}" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d @/home/claude/deploy_payload.json \
  | python3 -c "
import json,sys
r=json.load(sys.stdin)
if 'url' in r:
    print('✅ Deployed:', r['url'])
    print('   ID:', r.get('id',''))
else:
    print('❌ Error:', r.get('error',{}).get('message', str(r)[:200]))
"
