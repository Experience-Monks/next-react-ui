#!/bin/bash
set -e

aws configure set preview.cloudfront true

INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths '/*' | jq -r '.Invalidation.Id');

aws cloudfront wait invalidation-completed \
  --distribution-id $DISTRIBUTION_ID \
  --id $INVALIDATION_ID
