import $ from 'jquery'
import _ from 'lodash'

$('#form').on('submit', function(ev) {
  ev.preventDefault();
  window.alert(getRecommendedPlan());
});

/**
 * All of the data about our plans.
 */
export const planDataObj = {
  'Deluxe': {
    headline: 'For the social small business',
    details: {
      'Cost Per Month': 59,
      'Number of Social Profiles': 5,
      'Brand Keywords per Group': 5,
      'Included Users': 1,
      'Additional Users': 59,
      'Included Groups': 1,
      'Audience Size': 'Up to 100,000'
    },
    values: {
      socialprofiles: 5,
      users: 1,
      audience: 100000,
      costPerMonth: 59,
      costPerUser: 59
    }
  },
  'Premium': {
    headline: 'A bigger plan for bigger social needs',
    details: {
      'Cost Per Month': '$99',
      'Number of Social Profiles': 10,
      'Brand Keywords per Group': 10,
      'Included Users': 1,
      'Additional Users': '$99',
      'Included Groups': 3,
      'Audience Size (Fans/Followers)': 'Up to 200,000'
    },
    values: {
      socialprofiles: 10,
      users: 1,
      audience: 200000,
      costPerMonth: 99,
      costPerUser: 99
    }
  },
  'Team': {
    headline: 'Collaborate and conquer social media',
    details: {
      'Cost Per Month': '$500',
      'Number of Social Profiles': 30,
      'Brand Keywords per Group': 10,
      'Included Users': 3,
      'Additional Users': '$125',
      'Included Groups': 20,
      'Audience Size (Fans/Followers)': 'Up to 500,000'
    },
    values: {
      socialprofiles: 30,
      users: 3,
      audience: 500000,
      costPerMonth: 500,
      costPerUser: 125
    }
  },
  'Enterprise': {
    headline: 'Maximize your global social reach',
    details: {
      'Cost Per Month': '$1,500',
      'Number of Social Profiles': 50,
      'Brand Keywords per Group': 20,
      'Included Users': 10,
      'Additional Users': '$125',
      'Included Groups': 50,
      'Audience Size (Fans/Followers)': 'Unlimited'
    },
    values: {
      // intentionally big numbers for easier comparison logic
      socialprofiles: Number.MAX_SAFE_INTEGER,
      users: 10,
      audience: Number.MAX_SAFE_INTEGER,
      costPerMonth: 1500,
      costPerUser: 125
    }
  }
};


/**
 * Recommend a plan based on the form input.
 */
export const getRecommendedPlan = () => {
  const formValuesArray = $('#form').serializeArray();
  const formValues = _.zipObject(_.map(formValuesArray, 'name'), _.map(formValuesArray, i => parseInt(i.value, 10) || 1));

  // Make 100% sure the plans are sorted in ascending order
  let planNames = _.sortBy(_.keys(planDataObj), (plan) => planDataObj[plan].values.socialprofiles);
  let recommendedPlan = planNames[0];

  ['audience', 'socialprofiles'].forEach((key) => {
    recommendedPlan = planNames.filter((plan) => (formValues[key] || 0) <= planDataObj[plan].values[key]).shift();
    planNames = planNames.slice(planNames.indexOf(recommendedPlan));
  });

  // Recommend plan based on multiple users
  if (formValues.users > 1 && planDataObj[recommendedPlan].values.users === 1) {
    const recommendedPlanValues = planDataObj[recommendedPlan].values;
    const recommendedPlanCost = recommendedPlanValues.costPerUser * formValues.users;
    
    const biggerPlan = planNames.filter((plan) => {
      const {
        users,
        costPerUser,
        costPerMonth
      } = planDataObj[plan].values;
      const extraUsers = Math.max(formValues.users - users, 0);
      const biggerPlanCost = costPerMonth + extraUsers * costPerUser;
      return biggerPlanCost <= recommendedPlanCost;
    });

    recommendedPlan = _.isEmpty(biggerPlan) ? recommendedPlan : biggerPlan.shift();
  }

  return recommendedPlan;
}

