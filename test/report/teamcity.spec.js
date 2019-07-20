const fs           = require('fs');
const path         = require('path');
const expect       = require('chai').expect;
const render       = require('../../src/report/teamcity');
const okdeps       = require('./fixtures/teamcity/everything-fine.json');
const moduleErrs   = require('./fixtures/teamcity/module-errors.json');

function removePerSessionAttributes(pString) {
    return pString.replace(/ flowId='[^']+' timestamp='[^']+'/g, "");
}

describe("report/teamcity", () => {
    it("says everything fine when everything is fine", () => {
        const lFixture = fs.readFileSync(
            path.join(__dirname, 'fixtures', 'teamcity', 'everything-fine-teamcity-format.txt'),
            'utf8'
        );
        const lResult = render(okdeps);

        expect(
            removePerSessionAttributes(lResult.output)
        ).to.equal(
            lFixture
        );
        expect(lResult.exitCode).to.equal(0);
    });

    it("renders module only transgressions", () => {
        const lFixture = fs.readFileSync(
            path.join(__dirname, 'fixtures', 'teamcity', 'module-errors-teamcity-format.txt'),
            'utf8'
        );
        const lResult = render(moduleErrs);

        expect(
            removePerSessionAttributes(
                lResult.output
            )
        ).to.equal(
            lFixture
        );
        // eslint-disable-next-line no-magic-numbers
        expect(lResult.exitCode).to.equal(5);
    });

});
