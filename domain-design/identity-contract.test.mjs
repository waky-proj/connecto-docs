import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createCognitoClient } from "../../connecto-app/src/services/cognito.js";

test("declared Cognito public client permits the actual login and refresh flows", async () => {
  const terraform = await readFile(
    new URL("../../connecto-api/terraform/cognito.tf", import.meta.url),
    "utf8",
  );
  const flows = terraform.match(/explicit_auth_flows\s*=\s*\[([^\]]+)\]/)?.[1];
  assert.ok(flows, "Cognito explicit auth flows must be declared");
  assert.match(terraform, /generate_secret\s*=\s*false/);
  let time = 0;
  const client = createCognitoClient({
    region: "ap-southeast-2",
    clientId: "public-client",
    now: () => time,
    fetchImpl: async (url, options) => {
      assert.ok(url.startsWith("https://cognito-idp."));
      const request = JSON.parse(options.body);
      assert.ok(
        flows.includes(`"ALLOW_${request.AuthFlow}"`),
        `Terraform must permit ${request.AuthFlow}`,
      );
      assert.equal(request.SECRET_HASH, undefined);
      assert.equal(request.AuthParameters.SECRET_HASH, undefined);
      return new Response(
        JSON.stringify({
          AuthenticationResult: {
            AccessToken: "access",
            RefreshToken: "refresh",
            ExpiresIn: 60,
          },
        }),
      );
    },
  });
  await client.login({ email: "a@example.com", password: "example" });
  time = 40000;
  await client.getAccessToken();
});
