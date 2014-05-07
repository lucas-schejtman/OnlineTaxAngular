for i in {1..7}
do
	curl -i -X POST -H "Content-Type: application/json" -d '{
	"name": "Tax credit claim form 2014 IR526",
	"path": "526",
	"country": "New Zealand",
	"description":"Complete this form to claim tax credits for donations for the tax year 1 April 2013 to 31 March 2014. If you are making a claim for the years 2011 and before, or the 2012 year, please use either the Tax credit claim form 2000-2011 (IR526) and/or the Tax credit claim form 2013 (IR526)."
	}' http://localhost:8080/api/forms
done
